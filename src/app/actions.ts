"use server";

import { put, list, del } from "@vercel/blob";

import { PREVIEW_TABLE_COLUMNS } from "@/constants";
import fs from "fs";
import xlsx from "node-xlsx";
import path from "path";
import { create } from "xmlbuilder2";
import COUNTRY_CODES from "../lib/country_codes.json";

export async function uploadFile(prevState: any, formData: FormData) {
  const file = formData.get("file") as File;

  try {
    await saveFile(file);

    return { message: "success" };
  } catch (err) {
    return { message: "error" };
  }
}

async function saveFile(file: File) {
  const data = await file.arrayBuffer();

  const blobList = await list();

  blobList.blobs.map((blob) => {
    del(blob.url);
  });

  const blob = await put("doc.xlsx", data, {
    access: "public",
  });

  return blob;
}

function groupByCodeCountryCodeTitle(data: any[][]): Record<string, IItem> {
  // Sort data by code first
  const sortedData = data
    .filter((x) => x.length > 0)
    .sort((a, b) => a[0].localeCompare(b[0]));

  return sortedData.reduce((acc: any, item) => {
    const country_code =
      item[
        PREVIEW_TABLE_COLUMNS.find((x) => x.key === "country_code")?.idx || 0
      ];
    const code = item[
      PREVIEW_TABLE_COLUMNS.find((x) => x.key === "code")?.idx || 0
    ].replaceAll(" ", "");
    const title =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "title")?.idx || 0];
    const qty =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "total_qty")?.idx || 0];
    const price =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "sum_price")?.idx || 0];
    const netto =
      item[
        PREVIEW_TABLE_COLUMNS.find((x) => x.key === "total_netto")?.idx || 0
      ];
    const brutto =
      item[
        PREVIEW_TABLE_COLUMNS.find((x) => x.key === "total_brutto")?.idx || 0
      ];

    // Sanitize and lowercase elements for groupKey stability
    const sanitizedCode = String(code).trim().toLowerCase();
    const sanitizedCountryName = String(country_code).trim().toLowerCase();
    const sanitizedTitle = String(title).trim().toLowerCase();

    // Create a more stable groupKey using underscores
    const groupKey = `${sanitizedCode}_${sanitizedCountryName}`;

    acc[groupKey] = acc[groupKey] || {
      code,
      country_code:
        COUNTRY_CODES.find(
          (x) => String(x.name).trim().toLowerCase() === sanitizedCountryName
        )?.isoCode || "-",
      titles: [],
      total_qty: 0,
      total_brutto: 0,
      total_netto: 0,
      sum_price: 0.0,
    };

    // Add unique title to group, using Set for efficient duplicates removal
    const titlesSet = new Set(acc[groupKey].titles);
    titlesSet.add(sanitizedTitle);

    acc[groupKey].titles = Array.from(titlesSet); // Convert back to array

    acc[groupKey].total_qty += qty;
    acc[groupKey].total_brutto += brutto;
    acc[groupKey].total_netto += netto;
    acc[groupKey].sum_price += price;

    return acc;
  }, {});
}

export async function parseFile() {
  try {
    const blobList = await list();

    const blobUrl =
      blobList.blobs.find((x) => x.pathname.includes(".xlsx"))?.url ||
      "unknown";

    const res = await fetch(blobUrl);

    const resArrayBuffer = await res.arrayBuffer();

    const workSheetsFromFile = xlsx.parse(resArrayBuffer);

    const items = workSheetsFromFile[1].data.slice(1);

    const groupedData = groupByCodeCountryCodeTitle(items);
    const groupedDataList = Object.values(groupedData);

    return {
      items: groupedDataList,
      count: groupedDataList.length,
      total_brutto: groupedDataList.reduce((acc, item) => {
        return acc + item.total_brutto;
      }, 0),
      total_price: groupedDataList.reduce((acc, item) => {
        return acc + item.sum_price;
      }, 0),
    };
  } catch (err) {
    return { items: [], count: 0, total_brutto: 0, total_price: 0 };
  }
}

export interface IItem {
  code: string;
  country_code: string;
  titles: string[];
  total_qty: number;
  total_brutto: number;
  total_netto: number;
  sum_price: number;
}

export async function buildXML(data: {
  items: IItem[];
  count: number;
  total_brutto: number;
  total_price: number;
  mode: number;
}) {
  let mode = "";
  let modeNumber = "";
  let cap = "";
  let preferenceCode = "";
  let extendedCustomsProcedure = "";
  let nationalCustomsProcedure = "";

  switch (data.mode) {
    case 1:
      mode = "ექ";
      modeNumber = "1";
      cap = "";
      preferenceCode = "";
      extendedCustomsProcedure = "1000";
      nationalCustomsProcedure = "001";
      break;
    case 2:
      mode = "სხვ";
      modeNumber = "7";
      cap = "1";
      preferenceCode = "900";
      extendedCustomsProcedure = "7400";
      nationalCustomsProcedure = "004";
      break;
    case 3:
      mode = "რექ";
      modeNumber = "1";
      cap = "";
      preferenceCode = "";
      extendedCustomsProcedure = "1174";
      nationalCustomsProcedure = "002";
      break;

    // import
    default:
      mode = "იმ";
      modeNumber = "4";
      cap = "1";
      preferenceCode = "900";
      extendedCustomsProcedure = "4000";
      nationalCustomsProcedure = "000";
  }

  let xmlStr = /*xml*/ `
<ASYCUDA id="5337710">
  <Assessment_notice>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
    <Item_tax_total/>
  </Assessment_notice>
  <Global_taxes>
    <Global_tax_item/>
    <Global_tax_item/>
    <Global_tax_item/>
    <Global_tax_item/>
    <Global_tax_item/>
    <Global_tax_item/>
    <Global_tax_item/>
    <Global_tax_item/>
  </Global_taxes>
  <Property>
    <Sad_flow>I</Sad_flow>
    <Forms>
      <Number_of_the_form>1</Number_of_the_form>
      <Total_number_of_forms></Total_number_of_forms>
    </Forms>
    <Nbers>
      <Number_of_loading_lists/>
      <Total_number_of_items>${data.items.length}</Total_number_of_items>
      <Total_number_of_packages>${data.items.length}</Total_number_of_packages>
    </Nbers>
    <Place_of_declaration>
      <null/>
    </Place_of_declaration>
    <Date_of_declaration/>
    <Selected_page>1</Selected_page>
  </Property>
  <Identification>
    <Office_segment>
      <Customs_clearance_office_code>11111</Customs_clearance_office_code>
      <Customs_Clearance_office_name>გეზი თბილისი / CCZ Tbilisi</Customs_Clearance_office_name>
    </Office_segment>
    <Type>
      <Type_of_declaration>${mode}</Type_of_declaration>
      <Declaration_gen_procedure_code>${modeNumber}</Declaration_gen_procedure_code>
      <Type_of_transit_document>
        <null/>
      </Type_of_transit_document>
    </Type>
    <Manifest_reference_number>
      <null/>
    </Manifest_reference_number>
    <Registration>
      <Serial_number></Serial_number>
      <Number></Number>
      <Date></Date>
    </Registration>
    <Assessment>
      <Serial_number>
        <null/>
      </Serial_number>
      <Number/>
      <Date/>
    </Assessment>
    <receipt>
      <Serial_number>
        <null/>
      </Serial_number>
      <Number/>
      <Date/>
    </receipt>
  </Identification>
  <Traders>
    <Exporter>
      <Exporter_code>
        <null/>
      </Exporter_code>
      <Exporter_name></Exporter_name>
    </Exporter>
    <Consignee>
      <Consignee_code></Consignee_code>
      <Consignee_name></Consignee_name>
    </Consignee>
    <Financial>
      <Financial_code></Financial_code>
      <Financial_name></Financial_name>
    </Financial>
  </Traders>
  <Declarant>
    <Declarant_code></Declarant_code>
    <Declarant_name></Declarant_name>
    <Declarant_representative>
      <null/>
    </Declarant_representative>
    <Reference>
      <Number></Number>
    </Reference>
  </Declarant>
  <General_information>
    <Country>
      <Country_first_destination>
        <null/>
      </Country_first_destination>
      <Trading_country></Trading_country>
      <Export>
        <Export_country_code></Export_country_code>
        <Export_country_name></Export_country_name>
        <Export_country_region></Export_country_region>
      </Export>
      <Destination>
        <Destination_country_code></Destination_country_code>
        <Destination_country_name></Destination_country_name>
        <Destination_country_region>
          <null/>
        </Destination_country_region>
      </Destination>
      <Country_of_origin_name>MANY</Country_of_origin_name>
    </Country>
    <Value_details>0</Value_details>
    <CAP>${cap}</CAP>
    <Additional_information>
      <null/>
    </Additional_information>
    <Comments_free_text>
      <null/>
    </Comments_free_text>
  </General_information>
  <Transport>
    <Means_of_transport>
      <Departure_arrival_information>
        <Identity></Identity>
        <Nationality></Nationality>
      </Departure_arrival_information>
      <Border_information>
        <Identity></Identity>
        <Nationality></Nationality>
        <Mode></Mode>
      </Border_information>
      <Inland_mode_of_transport></Inland_mode_of_transport>
    </Means_of_transport>
    <Container_flag></Container_flag>
    <Delivery_terms>
      <Code></Code>
      <Place></Place>
      <Situation>
        <null/>
      </Situation>
    </Delivery_terms>
    <Border_office>
      <Code></Code>
      <Name></Name>
    </Border_office>
    <Place_of_loading>
      <Code>
        <null/>
      </Code>
      <Name>
        <null/>
      </Name>
      <Country>
        <null/>
      </Country>
    </Place_of_loading>
    <Location_of_goods></Location_of_goods>
  </Transport>
  <Financial>
    <Financial_transaction>
      <code1>2</code1>
      <code2>1</code2>
    </Financial_transaction>
    <Bank>
      <Code>0</Code>
      <Name>.</Name>
      <Branch>
        <null/>
      </Branch>
      <Reference>
        <null/>
      </Reference>
    </Bank>
    <Terms>
      <Code>
        <null/>
      </Code>
      <Description>
        <null/>
      </Description>
    </Terms>
    <Total_invoice/>
    <Deffered_payment_reference>
      <null/>
    </Deffered_payment_reference>
    <Mode_of_payment>ნაღდი</Mode_of_payment>
    <Amounts>
      <Total_manual_taxes/>
      <Global_taxes>0</Global_taxes>
      <Totals_taxes>0</Totals_taxes>
    </Amounts>
    <Guarantee>
      <Name>
        <null/>
      </Name>
      <Amount>0</Amount>
      <Date/>
      <Excluded_country>
        <Code>
          <null/>
        </Code>
        <Name>
          <null/>
        </Name>
      </Excluded_country>
    </Guarantee>
  </Financial>
  <Warehouse>
    <Identification>
      <null/>
    </Identification>
    <Delay/>
  </Warehouse>
  <Transit>
    <Principal>
      <Code>
        <null/>
      </Code>
      <Name>
        <null/>
      </Name>
      <Representative>
        <null/>
      </Representative>
    </Principal>
    <Signature>
      <Place>
        <null/>
      </Place>
      <Date/>
    </Signature>
    <Destination>
      <Office>
        <null/>
      </Office>
      <Country>
        <null/>
      </Country>
    </Destination>
    <Seals>
      <Number/>
      <Identity>
        <null/>
      </Identity>
    </Seals>
    <Result_of_control>
      <null/>
    </Result_of_control>
    <Time_limit/>
    <Officer_name>
      <null/>
    </Officer_name>
  </Transit>
  <Valuation>
    <Calculation_working_mode>1</Calculation_working_mode>
    <Weight>
      <Gross_weight>0</Gross_weight>
    </Weight>
    <Total_cost>0</Total_cost>
    <Total_CIF>0</Total_CIF>
    <Gs_Invoice>
      <Amount_national_currency>0</Amount_national_currency>
      <Amount_foreign_currency>0</Amount_foreign_currency>
      <Currency_code>840</Currency_code>
      <Currency_name>No foreign currency</Currency_name>
      <Currency_rate>2.6588</Currency_rate>
    </Gs_Invoice>
    <Gs_external_freight>
      <Amount_national_currency>0</Amount_national_currency>
      <Amount_foreign_currency>0</Amount_foreign_currency>
      <Currency_code>
        <null/>
      </Currency_code>
      <Currency_name></Currency_name>
      <Currency_rate></Currency_rate>
    </Gs_external_freight>
    <Gs_internal_freight>
      <Amount_national_currency></Amount_national_currency>
      <Amount_foreign_currency></Amount_foreign_currency>
      <Currency_code>
        <null/>
      </Currency_code>
      <Currency_name></Currency_name>
      <Currency_rate></Currency_rate>
    </Gs_internal_freight>
    <Gs_insurance>
      <Amount_national_currency></Amount_national_currency>
      <Amount_foreign_currency></Amount_foreign_currency>
      <Currency_code>
        <null/>
      </Currency_code>
      <Currency_name></Currency_name>
      <Currency_rate></Currency_rate>
    </Gs_insurance>
    <Gs_other_cost>
      <Amount_national_currency></Amount_national_currency>
      <Amount_foreign_currency></Amount_foreign_currency>
      <Currency_code>
        <null/>
      </Currency_code>
      <Currency_name></Currency_name>
      <Currency_rate></Currency_rate>
    </Gs_other_cost>
    <Gs_deduction>
      <Amount_national_currency></Amount_national_currency>
      <Amount_foreign_currency></Amount_foreign_currency>
      <Currency_code>
        <null/>
      </Currency_code>
      <Currency_name></Currency_name>
      <Currency_rate></Currency_rate>
    </Gs_deduction>
    <Total>
      <Total_invoice></Total_invoice>
      <Total_weight></Total_weight>
    </Total>
  </Valuation>
  `;

  data.items.map((item) => {
    const countryCode = item["country_code"];
    const code = item["code"].replaceAll(" ", "");
    const titles = item["titles"];
    const qty = item["total_qty"];
    const amount = item["sum_price"];
    const netto = item["total_netto"];
    const brutto = item["total_brutto"];

    xmlStr += /*xml*/ ` 
    <Item>
      <Packages>
        <Number_of_packages>1</Number_of_packages>
        <Marks1_of_packages>აღნიშვნების გარეშე</Marks1_of_packages>
        <Marks2_of_packages>
          <null/>
        </Marks2_of_packages>
        <Kind_of_packages_code>17</Kind_of_packages_code>
        <Kind_of_packages_name>სხვა / Others</Kind_of_packages_name>
      </Packages>
      <IncoTerms>
        <Code></Code>
        <Place></Place>
      </IncoTerms>
      <Tarification>
        <Tarification_data>
          <null/>
        </Tarification_data>
        <HScode>
          <Commodity_code>${code.substring(0, 8)}</Commodity_code>
          <Precision_1>${code.substring(8, 11)}</Precision_1>
          <Precision_2>
            <null/>
          </Precision_2>
          <Precision_3>
            <null/>
          </Precision_3>
          <Precision_4>
            <null/>
          </Precision_4>
        </HScode>
        <Preference_code>${preferenceCode}</Preference_code>
        <Extended_customs_procedure>${extendedCustomsProcedure}</Extended_customs_procedure>
        <National_customs_procedure>${nationalCustomsProcedure}</National_customs_procedure>
        <Quota_code>
          <null/>
        </Quota_code>
        <Quota>
          <QuotaCode>
            <null/>
          </QuotaCode>
          <QuotaId>
            <null/>
          </QuotaId>
          <QuotaItem>
            <ItmNbr>
              <null/>
            </ItmNbr>
          </QuotaItem>
        </Quota>
        <Supplementary_unit>
          <Suppplementary_unit_code>796</Suppplementary_unit_code>
          <Suppplementary_unit_name>ცალი</Suppplementary_unit_name>
          <Suppplementary_unit_quantity>${qty}</Suppplementary_unit_quantity>
        </Supplementary_unit>
        <Supplementary_unit>
          <Suppplementary_unit_code>
            <null/>
          </Suppplementary_unit_code>
          <Suppplementary_unit_name>
            <null/>
          </Suppplementary_unit_name>
          <Suppplementary_unit_quantity/>
        </Supplementary_unit>
        <Supplementary_unit>
          <Suppplementary_unit_code>
            <null/>
          </Suppplementary_unit_code>
          <Suppplementary_unit_name>
            <null/>
          </Suppplementary_unit_name>
          <Suppplementary_unit_quantity/>
        </Supplementary_unit>
        <Valuation_method_code>1</Valuation_method_code>
        <Value_item />
        <Attached_doc_item>
          <null/>
        </Attached_doc_item>
        <A.I._code>
          <null/>
        </A.I._code>
      </Tarification>
      <Goods_description>
        <Country_of_origin_code>${countryCode}</Country_of_origin_code>
        <Country_of_origin_region>${
          COUNTRY_CODES.find((x) => x.isoCode === countryCode)?.code || "-"
        }</Country_of_origin_region>
        <Description_of_goods>${titles.join(", ")}</Description_of_goods>
        <Commercial_Description>
          <null/>
        </Commercial_Description>
      </Goods_description>
      <Previous_doc>
        <Summary_declaration>
          <null/>
        </Summary_declaration>
        <Summary_declaration_sl>
          <null/>
        </Summary_declaration_sl>
        <Previous_document_reference>
          <null/>
        </Previous_document_reference>
        <Previous_warehouse_code>
          <null/>
        </Previous_warehouse_code>
      </Previous_doc>
      <Licence_number>
        <null/>
      </Licence_number>
      <Amount_deducted_from_licence/>
      <Quantity_deducted_from_licence/>
      <Free_text_1>
        <null/>
      </Free_text_1>
      <Free_text_2>
        <null/>
      </Free_text_2>
      <Taxation>
        <Item_taxes_amount>1</Item_taxes_amount>
        <Item_taxes_guaranted_amount/>
        <Item_taxes_mode_of_payment>1</Item_taxes_mode_of_payment>
        <Counter_of_normal_mode_of_payment/>
        <Displayed_item_taxes_amount/>
        <Taxation_line>
          <Duty_tax_code>1</Duty_tax_code>
          <Duty_tax_Base>1</Duty_tax_Base>
          <Duty_tax_rate>1</Duty_tax_rate>
          <Duty_tax_amount>1</Duty_tax_amount>
          <Duty_tax_MP>1</Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
        <Taxation_line>
          <Duty_tax_code>
            <null/>
          </Duty_tax_code>
          <Duty_tax_Base/>
          <Duty_tax_rate/>
          <Duty_tax_amount/>
          <Duty_tax_MP>
            <null/>
          </Duty_tax_MP>
          <Duty_tax_Type_of_calculation>
            <null/>
          </Duty_tax_Type_of_calculation>
        </Taxation_line>
      </Taxation>
      <Valuation_item>
        <Weight_itm>
          <Gross_weight_itm>${brutto.toFixed(2)}</Gross_weight_itm>
          <Net_weight_itm>${netto.toFixed(2)}</Net_weight_itm>
        </Weight_itm>
        <Total_cost_itm>0</Total_cost_itm>
        <Total_CIF_itm>1</Total_CIF_itm>
        <Rate_of_adjustement>1</Rate_of_adjustement>
        <Statistical_value>1</Statistical_value>
        <Alpha_coeficient_of_apportionment>1</Alpha_coeficient_of_apportionment>
        <Item_Invoice>
          <Amount_national_currency>1</Amount_national_currency>
          <Amount_foreign_currency>${amount.toFixed(
            2
          )}</Amount_foreign_currency>
          <Currency_code>840</Currency_code>
          <Currency_name>
            <null/>
          </Currency_name>
          <Currency_rate>1</Currency_rate>
        </Item_Invoice>
        <item_external_freight>
          <Amount_national_currency/>
          <Amount_foreign_currency>0.0</Amount_foreign_currency>
          <Currency_code>
            <null/>
          </Currency_code>
          <Currency_name>No foreign currency</Currency_name>
          <Currency_rate>0</Currency_rate>
        </item_external_freight>
        <item_internal_freight>
          <Amount_national_currency>0</Amount_national_currency>
          <Amount_foreign_currency>0.0</Amount_foreign_currency>
          <Currency_code>
            <null/>
          </Currency_code>
          <Currency_name>No foreign currency</Currency_name>
          <Currency_rate>0</Currency_rate>
        </item_internal_freight>
        <item_insurance>
          <Amount_national_currency>0</Amount_national_currency>
          <Amount_foreign_currency>0.0</Amount_foreign_currency>
          <Currency_code>
            <null/>
          </Currency_code>
          <Currency_name>No foreign currency</Currency_name>
          <Currency_rate>0</Currency_rate>
        </item_insurance>
        <item_other_cost>
          <Amount_national_currency/>
          <Amount_foreign_currency>0.0</Amount_foreign_currency>
          <Currency_code>
            <null/>
          </Currency_code>
          <Currency_name>No foreign currency</Currency_name>
          <Currency_rate>0</Currency_rate>
        </item_other_cost>
        <item_deduction>
          <Amount_national_currency/>
          <Amount_foreign_currency>0.0</Amount_foreign_currency>
          <Currency_code>
            <null/>
          </Currency_code>
          <Currency_name>No foreign currency</Currency_name>
          <Currency_rate>0</Currency_rate>
        </item_deduction>
        <Market_valuer>
          <Rate/>
          <Currency_code>
            <null/>
          </Currency_code>
          <Currency_amount>0</Currency_amount>
          <Basis_description>
            <null/>
          </Basis_description>
          <Basis_amount/>
        </Market_valuer>
      </Valuation_item>
    </Item>
    `;
  });

  xmlStr += "</ASYCUDA>";

  const doc = create(xmlStr);

  const xml = doc.end({ prettyPrint: true });

  try {
    const blobList = await list();

    blobList.blobs.map((blob) => {
      if (blob.pathname.includes(".xml")) {
        del(blob.url);
      }
    });

    const blob = await put("doc.xml", xml, {
      access: "public",
    });

    return blob;
  } catch (err) {}
}
