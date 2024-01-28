"use server";
import { PREVIEW_TABLE_COLUMNS } from "@/constants";
import fs from "fs";
import xlsx from "node-xlsx";
import path from "path";
import { create } from "xmlbuilder2";

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

  const filePath = path.resolve(process.cwd(), "public", "doc.xlsx");

  await fs.appendFile(filePath, Buffer.from(data), (err) => {
    console.log(err);
  });

  parseFile();

  return;
}

export async function parseFile() {
  try {
    const filePath = path.resolve(process.cwd(), "public", "doc.xlsx");
    const workSheetsFromFile = xlsx.parse(path.join(filePath));

    const items = workSheetsFromFile[0].data;

    return { items: items.slice(0, 40), count: items.length };
  } catch (err) {
    return { items: [], count: 0 };
  }
}

export async function buildXML(data: { items: any[][]; count: number }) {
  // const root = create().ele("ASYCUDA");

  // const Assessment_notice = root.ele("Assessment_notice");
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.ele("Item_tax_total").up();
  // Assessment_notice.up();

  // const Global_taxes = root.ele("Global_taxes");
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.ele("Global_tax_item").up();
  // Global_taxes.up();

  // const Property = root.ele("Property");
  // Property.ele("Sad_flow").txt("I");
  // Property.ele("Forms")
  //   .ele("Number_of_the_form")
  //   .txt("I")
  //   .up()

  //   .ele("Total_number_of_forms")
  //   .txt("25")
  //   .up()

  //   .up();

  // Property.ele("Nbers")
  //   .ele("Number_of_loading_lists")
  //   .up()

  //   .ele("Total_number_of_items")
  //   .txt("72")
  //   .up()

  //   .ele("Total_number_of_packages")
  //   .txt("72")
  //   .up()

  //   .up();
  // Property.ele("Place_of_declaration").ele("null").up().up();
  // Property.ele("Date_of_declaration").up();
  // Property.ele("Selected_page").txt("1").up();
  // Property.up();

  // const Identification = root.ele("Identification");
  // Identification.ele("Office_segment")
  //   .ele("Customs_clearance_office_code")
  //   .txt("11111")
  //   .up()

  //   .ele("Customs_Clearance_office_name")
  //   .txt("გეზი თბილისი / CCZ Tbilisi")
  //   .up()

  //   .up();
  // Identification.ele("Type")
  //   .ele("Type_of_declaration")
  //   .txt("იმ")
  //   .up()

  //   .ele("Declaration_gen_procedure_code")
  //   .txt("4")
  //   .up()

  //   .ele("Type_of_transit_document")
  //   .ele("null")
  //   .up()
  //   .up()

  //   .up();
  // Identification.ele("Manifest_reference_number")
  //   .ele("null")
  //   .up()

  //   .up();
  // Identification.ele("Registration")
  //   .ele("Serial_number")
  //   .txt("C")
  //   .up()

  //   .ele("Number")
  //   .txt("6659")
  //   .up()

  //   .ele("Date")
  //   .txt("1/23/24")
  //   .up()

  //   .up();
  // Identification.ele("Assessment")
  //   .ele("Serial_number")
  //   .ele("null")
  //   .up()
  //   .up()

  //   .ele("Number")
  //   .up()

  //   .ele("Date")
  //   .up()

  //   .up();
  // Identification.ele("receipt")
  //   .ele("Serial_number")
  //   .ele("null")
  //   .up()
  //   .up()

  //   .ele("Number")
  //   .up()

  //   .ele("Date")
  //   .up()

  //   .up();
  // Identification.up();

  // const Traders = root.ele("Traders");
  // Traders.ele("Exporter")
  //   .ele("Exporter_code")
  //   .ele("null")
  //   .up()

  //   .ele("Exporter_name")
  //   .txt("LC WAİKİKİ DIŞ TİCARET ANONİM ŞİRKETİ თურქეთი / TURKEY")
  //   .up()
  //   .up()

  //   .up();
  // Traders.ele("Consignee")
  //   .ele("Consignee_code")
  //   .txt("404916114")
  //   .up()

  //   .ele("Consignee_name")
  //   .txt(
  //     "შპს ელსივაიკიკი გე საქართველო, თბილისი, საბურთალოს რაიონი, დიღმის სასწავლო საცდელი მეურნეობის ტერიტორია"
  //   )
  //   .up()

  //   .up();
  // Traders.ele("Financial")
  //   .ele("Financial_code")
  //   .txt("404916114")
  //   .up()

  //   .ele("Financial_name")
  //   .txt(
  //     "შპს ელსივაიკიკი გე საქართველო, თბილისი, საბურთალოს რაიონი, დიღმის სასწავლო საცდელი მეურნეობის ტერიტორია"
  //   )
  //   .up()

  //   .up();
  // Traders.up();

  // const Declarant = root.ele("Declarant");
  // Declarant.ele("Declarant_code").txt("404916114").up();
  // Declarant.ele("Declarant_name")
  //   .txt(
  //     "შპს ელსივაიკიკი გე თბილისი, დიღმის სასწავლო საცდელი მეურნეობის ტერიტორია"
  //   )
  //   .up();
  // Declarant.ele("Declarant_representative").ele("null").up().up();
  // Declarant.ele("Reference").ele("Number").txt("2").up().up();
  // Declarant.up();

  // const General_information = root.ele("General_information");
  // General_information.ele("Country")
  //   .ele("Country_first_destination")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Trading_country")
  //   .txt("792")
  //   .up()
  //   .ele("Export")
  //   .ele("Export_country_code")
  //   .txt("792")
  //   .up()
  //   .ele("Export_country_name")
  //   .txt("თურქეთი / TURKEY")
  //   .up()
  //   .ele("Export_country_region")
  //   .txt("TR")
  //   .up()
  //   .up()
  //   .ele("Destination")
  //   .ele("Destination_country_code")
  //   .txt("268")
  //   .up()
  //   .ele("Destination_country_name")
  //   .txt("საქართველო / GEORGIA")
  //   .up()
  //   .ele("Destination_country_region")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up()
  //   .ele("Country_of_origin_name")
  //   .txt("MANY")
  //   .up()
  //   .up()
  //   .ele("Value_details")
  //   .txt("0")
  //   .up()
  //   .ele("CAP")
  //   .txt("1")
  //   .up()
  //   .ele("Additional_information")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Comments_free_text")
  //   .ele("null")
  //   .up()
  //   .up();
  // General_information.up();

  // const Transport = root.ele("Transport");
  // Transport.ele("Means_of_transport")
  //   .ele("Departure_arrival_information")
  //   .ele("Identity")
  //   .txt("01 ა/მ ნაწ.")
  //   .up()
  //   .ele("Nationality")
  //   .txt("792")
  //   .up()
  //   .up()
  //   .ele("Border_information")
  //   .ele("Identity")
  //   .txt("01 ა/მ ნაწ.")
  //   .up()
  //   .ele("Nationality")
  //   .txt("792")
  //   .up()
  //   .ele("Mode")
  //   .txt("32")
  //   .up()
  //   .up()
  //   .ele("Inland_mode_of_transport")
  //   .txt("32")
  //   .up()
  //   .up();
  // Transport.ele("Container_flag").txt("false").up();
  // Transport.ele("Delivery_terms")
  //   .ele("Code")
  //   .txt("CIP")
  //   .up()
  //   .ele("Place")
  //   .txt("თბილისი")
  //   .up()
  //   .ele("Situation")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Transport.ele("Border_office")
  //   .ele("Code")
  //   .txt("69601")
  //   .up()
  //   .ele("Name")
  //   .txt(`სგპ  "სარფი" / BCP "Sarpi"`)
  //   .up()
  //   .up();
  // Transport.ele("Place_of_loading")
  //   .ele("Code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Name")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Country")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Transport.ele("Location_of_goods").txt("SGP99").up();
  // Transport.up();

  // const Financial = root.ele("Financial");
  // Financial.ele("Financial_transaction")
  //   .ele("code1")
  //   .txt("2")
  //   .up()
  //   .ele("code2")
  //   .txt("1")
  //   .up()
  //   .up();
  // Financial.ele("Bank")
  //   .ele("Code")
  //   .txt("0")
  //   .up()
  //   .ele("Name")
  //   .txt(".")
  //   .up()
  //   .ele("Branch")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Reference")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Financial.ele("Terms")
  //   .ele("Code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Description")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Financial.ele("Total_invoice").up();
  // Financial.ele("Deffered_payment_reference").ele("null").up().up();
  // Financial.ele("Mode_of_payment").txt("ნაღდი").up();
  // Financial.ele("Amounts")
  //   .ele("Total_manual_taxes")
  //   .up()
  //   .ele("Global_taxes")
  //   .txt("0")
  //   .up()
  //   .ele("Totals_taxes")
  //   .txt("1520.5")
  //   .up()
  //   .up();
  // Financial.ele("Guarantee")
  //   .ele("Name")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Amount")
  //   .txt("0")
  //   .up()
  //   .ele("Date")
  //   .up()
  //   .ele("Excluded_country")
  //   .ele("Code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Name")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up()
  //   .up();
  // Financial.up();

  // const Warehouse = root.ele("Warehouse");
  // Warehouse.ele("Identification").ele("null").up().up();
  // Warehouse.ele("Delay").up();
  // Warehouse.up();

  // const Transit = root.ele("Transit");
  // Transit.ele("Principal")
  //   .ele("Code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Name")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Representative")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Transit.ele("Signature")
  //   .ele("Place")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Date")
  //   .up()
  //   .up();
  // Transit.ele("Destination")
  //   .ele("Office")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Country")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Transit.ele("Seals")
  //   .ele("Number")
  //   .up()
  //   .ele("Identity")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .up();
  // Transit.ele("Result_of_control").ele("null").up().up();
  // Transit.ele("Time_limit").up();
  // Transit.ele("Officer_name").ele("null").up().up();
  // Transit.up();

  // const Valuation = root.ele("Valuation");
  // Valuation.ele("Calculation_working_mode").txt("1").up();
  // Valuation.ele("Weight").ele("Gross_weight").txt("177.37").up().up();
  // Valuation.ele("Total_cost").txt("0").up();
  // Valuation.ele("Total_CIF").txt("8440.62648").up();
  // Valuation.ele("Gs_Invoice")
  //   .ele("Amount_national_currency")
  //   .txt("8440.62648")
  //   .up()
  //   .ele("Amount_foreign_currency")
  //   .txt("3174.6")
  //   .up()
  //   .ele("Currency_code")
  //   .txt("840")
  //   .up()
  //   .ele("Currency_name")
  //   .txt("No foreign currency")
  //   .up()
  //   .ele("Currency_rate")
  //   .txt("2.6588")
  //   .up()
  //   .up();
  // Valuation.ele("Gs_external_freight")
  //   .ele("Amount_national_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Amount_foreign_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Currency_code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Currency_name")
  //   .txt("No foreign currency")
  //   .up()
  //   .ele("Currency_rate")
  //   .txt("0")
  //   .up()
  //   .up();
  // Valuation.ele("Gs_insurance")
  //   .ele("Amount_national_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Amount_foreign_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Currency_code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Currency_name")
  //   .txt("No foreign currency")
  //   .up()
  //   .ele("Currency_rate")
  //   .txt("0")
  //   .up()
  //   .up();
  // Valuation.ele("Gs_other_cost")
  //   .ele("Amount_national_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Amount_foreign_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Currency_code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Currency_name")
  //   .txt("No foreign currency")
  //   .up()
  //   .ele("Currency_rate")
  //   .txt("0")
  //   .up()
  //   .up();
  // Valuation.ele("Gs_deduction")
  //   .ele("Amount_national_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Amount_foreign_currency")
  //   .txt("0")
  //   .up()
  //   .ele("Currency_code")
  //   .ele("null")
  //   .up()
  //   .up()
  //   .ele("Currency_name")
  //   .txt("No foreign currency")
  //   .up()
  //   .ele("Currency_rate")
  //   .txt("0")
  //   .up()
  //   .up();
  // Valuation.ele("Total")
  //   .ele("Total_invoice")
  //   .txt("3174.6")
  //   .up()
  //   .ele("Total_weight")
  //   .txt("177.37")
  //   .up()
  //   .up();
  // Valuation.up();

  // root.com("f(x) = x^2");
  // for (let i = 1; i <= 5; i++) {
  //   const item = root.ele("data");
  //   // item.att("x", i);
  //   // item.att("y", i * i);
  // }

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
    <Sad_flow></Sad_flow>
    <Forms>
      <Number_of_the_form></Number_of_the_form>
      <Total_number_of_forms></Total_number_of_forms>
    </Forms>
    <Nbers>
      <Number_of_loading_lists/>
      <Total_number_of_items></Total_number_of_items>
      <Total_number_of_packages></Total_number_of_packages>
    </Nbers>
    <Place_of_declaration>
      <null/>
    </Place_of_declaration>
    <Date_of_declaration/>
    <Selected_page>1</Selected_page>
  </Property>
  <Identification>
    <Office_segment>
      <Customs_clearance_office_code></Customs_clearance_office_code>
      <Customs_Clearance_office_name></Customs_Clearance_office_name>
    </Office_segment>
    <Type>
      <Type_of_declaration></Type_of_declaration>
      <Declaration_gen_procedure_code></Declaration_gen_procedure_code>
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
      <Country_of_origin_name></Country_of_origin_name>
    </Country>
    <Value_details></Value_details>
    <CAP></CAP>
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
      <code1></code1>
      <code2></code2>
    </Financial_transaction>
    <Bank>
      <Code></Code>
      <Name></Name>
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
    <Mode_of_payment></Mode_of_payment>
    <Amounts>
      <Total_manual_taxes/>
      <Global_taxes></Global_taxes>
      <Totals_taxes></Totals_taxes>
    </Amounts>
    <Guarantee>
      <Name>
        <null/>
      </Name>
      <Amount></Amount>
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
    <Calculation_working_mode></Calculation_working_mode>
    <Weight>
      <Gross_weight></Gross_weight>
    </Weight>
    <Total_cost></Total_cost>
    <Total_CIF></Total_CIF>
    <Gs_Invoice>
      <Amount_national_currency></Amount_national_currency>
      <Amount_foreign_currency></Amount_foreign_currency>
      <Currency_code></Currency_code>
      <Currency_name></Currency_name>
      <Currency_rate></Currency_rate>
    </Gs_Invoice>
    <Gs_external_freight>
      <Amount_national_currency></Amount_national_currency>
      <Amount_foreign_currency></Amount_foreign_currency>
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
    const countryCode =
      item[
        PREVIEW_TABLE_COLUMNS.find((x) => x.key === "countryCode")?.idx || 0
      ];
    const code = item[
      PREVIEW_TABLE_COLUMNS.find((x) => x.key === "code")?.idx || 0
    ].replaceAll(" ", "");
    const title =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "title")?.idx || 0];
    const qty =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "qty")?.idx || 0];
    const price =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "price")?.idx || 0];
    const amount =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "amount")?.idx || 0];
    const netto =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "netto")?.idx || 0];
    const brutto =
      item[PREVIEW_TABLE_COLUMNS.find((x) => x.key === "brutto")?.idx || 0];

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
        <Preference_code>900</Preference_code>
        <Extended_customs_procedure>4000</Extended_customs_procedure>
        <National_customs_procedure>000</National_customs_procedure>
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
        <Value_item>0+0.00+0.00+0-0</Value_item>
        <Attached_doc_item>
          <null/>
        </Attached_doc_item>
        <A.I._code>
          <null/>
        </A.I._code>
      </Tarification>
      <Goods_description>
        <Country_of_origin_code>${countryCode}</Country_of_origin_code>
        <Country_of_origin_region></Country_of_origin_region>
        <Description_of_goods>${title}</Description_of_goods>
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
        <Item_taxes_amount></Item_taxes_amount>
        <Item_taxes_guaranted_amount/>
        <Item_taxes_mode_of_payment></Item_taxes_mode_of_payment>
        <Counter_of_normal_mode_of_payment/>
        <Displayed_item_taxes_amount/>
        <Taxation_line>
          <Duty_tax_code></Duty_tax_code>
          <Duty_tax_Base></Duty_tax_Base>
          <Duty_tax_rate></Duty_tax_rate>
          <Duty_tax_amount></Duty_tax_amount>
          <Duty_tax_MP></Duty_tax_MP>
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
          <Gross_weight_itm>${brutto}</Gross_weight_itm>
          <Net_weight_itm>${netto}</Net_weight_itm>
        </Weight_itm>
        <Total_cost_itm>0</Total_cost_itm>
        <Total_CIF_itm></Total_CIF_itm>
        <Rate_of_adjustement>1</Rate_of_adjustement>
        <Statistical_value></Statistical_value>
        <Alpha_coeficient_of_apportionment></Alpha_coeficient_of_apportionment>
        <Item_Invoice>
          <Amount_national_currency></Amount_national_currency>
          <Amount_foreign_currency>${amount}</Amount_foreign_currency>
          <Currency_code>840</Currency_code>
          <Currency_name>
            <null/>
          </Currency_name>
          <Currency_rate></Currency_rate>
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
    const filePath = path.resolve(process.cwd(), "public", "doc.xml");

    fs.unlink(filePath, () => {});

    fs.appendFile(filePath, xml, (err) => {
      console.log(err);
    });
  } catch (err) {}
}
