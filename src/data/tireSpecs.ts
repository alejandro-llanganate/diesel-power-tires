export type TireSpecRow = {
  productCode: string;
  size: string;
  plyRating: string;
  loadRange: string;
  loadIndex: string;
  speedSymbol: string;
  overallDiameter: string;
  sectionWidth: string;
  treadDepth: string;
  rim: string;
  singleMaxLoad: string;
  dualMaxLoad: string;
  staticLoadRadius: string;
  revsPerMile: string;
  weight: string;
  tireType: string;
};

export const SPEC_COLUMNS: { key: keyof TireSpecRow; label: string }[] = [
  { key: "productCode", label: "Código de producto" },
  { key: "size", label: "Medida" },
  { key: "plyRating", label: "Plies" },
  { key: "loadRange", label: "Rango de carga" },
  { key: "loadIndex", label: "Índice de carga" },
  { key: "speedSymbol", label: "Símbolo de velocidad" },
  { key: "overallDiameter", label: "Diámetro total (pulg)" },
  { key: "sectionWidth", label: "Ancho de sección (pulg)" },
  { key: "treadDepth", label: "Profundidad de banda (32nds)" },
  { key: "rim", label: "RIN" },
  { key: "singleMaxLoad", label: "Carga máx. individual / Presión" },
  { key: "dualMaxLoad", label: "Carga máx. dual / Presión" },
  { key: "staticLoadRadius", label: "Radio de carga estática" },
  { key: "revsPerMile", label: "Revoluciones por milla" },
  { key: "weight", label: "Peso" },
  { key: "tireType", label: "Tipo de llanta" },
];

/** Datos reales FR610 (referencia Double Coin) */
const FR610_ROWS: TireSpecRow[] = [
  {
    productCode: "1133781255",
    size: "11R22.5",
    plyRating: "14",
    loadRange: "G",
    loadIndex: "144/142",
    speedSymbol: "L",
    overallDiameter: "41.4",
    sectionWidth: "11.0",
    treadDepth: "20",
    rim: "8.25",
    singleMaxLoad: "6175lb/105psi",
    dualMaxLoad: "5840lb/105psi",
    staticLoadRadius: "19.4",
    revsPerMile: "500",
    weight: "119lb/54kg",
    tireType: "TL",
  },
  {
    productCode: "1133781256",
    size: "11R22.5",
    plyRating: "16",
    loadRange: "H",
    loadIndex: "148/145",
    speedSymbol: "L",
    overallDiameter: "41.4",
    sectionWidth: "11.0",
    treadDepth: "20",
    rim: "8.25",
    singleMaxLoad: "6940lb/123psi",
    dualMaxLoad: "6390lb/123psi",
    staticLoadRadius: "19.4",
    revsPerMile: "500",
    weight: "124lb/56kg",
    tireType: "TL",
  },
  {
    productCode: "1133781257",
    size: "295/75R22.5",
    plyRating: "14",
    loadRange: "G",
    loadIndex: "144/142",
    speedSymbol: "L",
    overallDiameter: "40.2",
    sectionWidth: "11.6",
    treadDepth: "20",
    rim: "8.25",
    singleMaxLoad: "6175lb/105psi",
    dualMaxLoad: "5840lb/105psi",
    staticLoadRadius: "18.9",
    revsPerMile: "515",
    weight: "118lb/53kg",
    tireType: "TL",
  },
];

function genRows(
  model: string,
  sizes: string[],
  baseCode: number,
  opts: {
    diameter?: string;
    width?: string;
    tread?: string;
    rim?: string;
    single?: string;
    dual?: string;
    weightLb?: number;
  } = {}
): TireSpecRow[] {
  const d = opts.diameter ?? "41.4";
  const w = opts.width ?? "11.0";
  const tread = opts.tread ?? "18";
  const rim = opts.rim ?? "8.25";
  const single = opts.single ?? "6000lb/100psi";
  const dual = opts.dual ?? "5670lb/100psi";
  const weightBase = opts.weightLb ?? 115;

  return sizes.flatMap((size, i) => {
    const ply = i % 2 === 0 ? "14" : "16";
    const lr = i % 2 === 0 ? "G" : "H";
    const li = i % 2 === 0 ? "144/142" : "148/145";
    const wt = weightBase + i * 3;
    return [
      {
        productCode: String(baseCode + i * 10),
        size,
        plyRating: ply,
        loadRange: lr,
        loadIndex: li,
        speedSymbol: "L",
        overallDiameter: d,
        sectionWidth: w,
        treadDepth: tread,
        rim,
        singleMaxLoad: single,
        dualMaxLoad: dual,
        staticLoadRadius: "19.2",
        revsPerMile: String(498 + i * 5),
        weight: `${wt}lb/${Math.round(wt * 0.45)}kg`,
        tireType: "TL",
      },
    ];
  });
}

export const tireSpecsByModel: Record<string, TireSpecRow[]> = {
  FR610: FR610_ROWS,
  FR605: genRows("FR605", ["11R22.5", "295/75R22.5"], 1133781200, {
    tread: "19",
    single: "6050lb/100psi",
    dual: "5720lb/100psi",
  }),
  FR620: genRows("FR620", ["11R22.5", "315/80R22.5"], 1133781300, {
    tread: "21",
    single: "6300lb/105psi",
    dual: "5950lb/105psi",
    weightLb: 122,
  }),
  FD405: genRows("FD405", ["11R22.5", "295/75R22.5"], 1133782100, {
    tread: "22",
    single: "6500lb/105psi",
    dual: "6150lb/105psi",
    weightLb: 125,
  }),
  FD400: genRows("FD400", ["11R22.5", "12R22.5"], 1133782000, {
    tread: "21",
    weightLb: 120,
  }),
  FD410: genRows("FD410", ["295/75R22.5", "315/80R22.5"], 1133782200, {
    tread: "22",
    weightLb: 128,
  }),
  FD415: genRows("FD415", ["11R22.5"], 1133782300, { tread: "23", weightLb: 130 }),
  FD425: genRows("FD425", ["445/50R22.5", "455/50R22.5"], 1133782400, {
    diameter: "40.8",
    width: "17.3",
    tread: "24",
    rim: "15.0",
    single: "7100lb/110psi",
    dual: "6750lb/110psi",
    weightLb: 145,
  }),
  FT105: genRows("FT105", ["11R22.5", "295/75R22.5"], 1133783100, {
    tread: "16",
    single: "5800lb/100psi",
    dual: "5500lb/100psi",
    weightLb: 110,
  }),
  FT110: genRows("FT110", ["11R22.5"], 1133783200, { tread: "15", weightLb: 108 }),
  FT115: genRows("FT115", ["11R22.5", "295/75R22.5"], 1133783300, {
    tread: "14",
    weightLb: 105,
  }),
  "FT125+": genRows("FT125+", ["445/50R22.5", "455/50R22.5"], 1133783400, {
    diameter: "40.5",
    width: "17.0",
    tread: "15",
    rim: "15.0",
    weightLb: 140,
  }),
  FT120: genRows("FT120", ["11R22.5", "12R22.5"], 1133783500, { tread: "16" }),
  RLB400: genRows("RLB400", ["11R22.5", "295/75R22.5", "12R22.5"], 1133784100, {
    tread: "23",
    single: "6800lb/110psi",
    dual: "6400lb/110psi",
    weightLb: 128,
  }),
  RLB450: genRows("RLB450", ["11R22.5", "295/75R22.5"], 1133784200, {
    tread: "24",
    weightLb: 132,
  }),
  RT500: genRows("RT500", ["225/70R19.5", "245/70R19.5", "255/70R22.5"], 1133785100, {
    diameter: "32.8",
    width: "8.9",
    tread: "14",
    rim: "6.75",
    single: "3960lb/95psi",
    dual: "3710lb/95psi",
    weightLb: 72,
  }),
  RT600: genRows("RT600", ["225/70R19.5", "245/70R19.5"], 1133785200, {
    diameter: "32.8",
    width: "9.0",
    tread: "15",
    rim: "6.75",
    weightLb: 74,
  }),
  RT510: genRows("RT510", ["255/70R22.5"], 1133785300, {
    diameter: "35.2",
    width: "10.0",
    tread: "15",
    weightLb: 78,
  }),
  TR100: genRows("TR100", ["11R22.5", "295/75R22.5"], 1133786100, {
    tread: "14",
    weightLb: 106,
  }),
  TR200: genRows("TR200", ["11R22.5"], 1133786200, { tread: "13", weightLb: 104 }),
  RR202: genRows("RR202", ["11R22.5", "12R22.5"], 1133787100, {
    tread: "25",
    single: "7000lb/115psi",
    dual: "6600lb/115psi",
    weightLb: 135,
  }),
  RR900: genRows("RR900", ["295/75R22.5"], 1133787200, { tread: "26", weightLb: 138 }),
};

export function getSpecsForModel(model: string): TireSpecRow[] {
  return tireSpecsByModel[model] ?? [];
}
