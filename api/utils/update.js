const fs = require("fs");
const moment = require("moment-timezone");
const { Parser } = require("json2csv");
const { JSDOM } = require("jsdom");

moment.locale("tr");

const update = async () => {
  try {
    const dom = await JSDOM.fromURL(
      "https://covid19.saglik.gov.tr/?lang=tr-TR",
      {
        runScripts: "dangerously",
      }
    );

    console.log(dom.window.sondurumjson);

    const data = dom.window.sondurumjson[0];
    if (!data) {
      console.log("sondurumjson");
      return new Error("data not found");
    }
    const date = moment(data.tarih, "DD.MM.YYYY").format("DD/MM/YYYY");

    const timeline = JSON.parse(fs.readFileSync("dataset/timeline.json"));
    const DOT_REGEX = /./gi;
    const COMMA_REGEX = /,/gi;
    const dayData = {
      date,
      adultIntensiveCareRatio: data.eriskin_yogun_bakim_doluluk_orani.replace(
        COMMA_REGEX,
        "."
      ),
      fillationRatio: data.filyasyon_orani.replace(COMMA_REGEX, "."),
      pneumoniaPercent: data.hastalarda_zaturre_oran.replace(COMMA_REGEX, "."),
      ventilatorOccupancyRatio: data.ventilator_doluluk_orani.replace(
        COMMA_REGEX,
        "."
      ),
      bedOccupancyRate: data.yatak_doluluk_orani.replace(COMMA_REGEX, "."),
      totalTests: data.toplam_test,
      totalPatients: data.toplam_hasta,
      totalDeaths: data.toplam_vefat,
      totalIntensiveCare: data.toplam_yogun_bakim,
      totalIntubated: data.toplam_entube,
      totalRecovered: data.toplam_iyilesen,
      tests: data.gunluk_test,
      cases: data.gunluk_vaka,
      patients: data.gunluk_hasta,
      critical: data.agir_hasta_sayisi,
      deaths: data.gunluk_vefat,
      recovered: data.gunluk_iyilesen,
    };
    timeline[date] = dayData;

    console.log(dayData);
    const csv = new Parser(Object.keys(dayData)).parse(Object.values(timeline));
    const json = JSON.stringify(timeline, null, 4);
    fs.writeFileSync("dataset/timeline.csv", csv);
    fs.writeFileSync("dataset/timeline.json", json);
  } catch (e) {
    // ignore
  }
};

update();
