import { assetPath } from "@/lib/site";

export type TirePosition =
  | "direccion"
  | "traccion"
  | "remolque"
  | "multiposicion";

export type TireFilter =
  | "larga-distancia"
  | "todas-posiciones"
  | "eficiencia-combustible"
  | "base-ancha";

export type Tire = {
  id: string;
  model: string;
  description: string;
  position: TirePosition;
  filters: TireFilter[];
  sizes: string[];
  smartway: boolean;
  image: string;
  detailImage: string;
  priceFrom: number;
};

export const CATALOG_IMAGE = assetPath("/llantas.png");
export const DETAIL_TREAD_IMAGE = assetPath("/tire-FR610-hero.webp");

export const TIRE_POSITION_LABELS: Record<TirePosition, string> = {
  direccion: "Dirección",
  traccion: "Tracción",
  remolque: "Remolque",
  multiposicion: "Multiposición",
};

export const FILTER_LABELS: Record<TireFilter, string> = {
  "larga-distancia": "Larga distancia",
  "todas-posiciones": "Todas las posiciones",
  "eficiencia-combustible": "Eficiencia de combustible (SmartWay®)",
  "base-ancha": "Base ancha",
};

export const tires: Tire[] = [
  {
    id: "fr610",
    model: "FR610",
    description:
      "Llanta ultra premium de eficiencia de combustible para posición de dirección",
    position: "direccion",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5", "295/75R22.5", "315/80R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 285,
  },
  {
    id: "fr605",
    model: "FR605",
    description: "Llanta de dirección de larga distancia con excelente kilometraje",
    position: "direccion",
    filters: ["larga-distancia"],
    sizes: ["11R22.5", "295/75R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 265,
  },
  {
    id: "fr620",
    model: "FR620",
    description: "Dirección premium para cargas pesadas y autopista",
    position: "direccion",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5", "315/80R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 298,
  },
  {
    id: "fd405",
    model: "FD405",
    description: "Llanta eficiente en combustible para posición de tracción",
    position: "traccion",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5", "295/75R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 275,
  },
  {
    id: "fd400",
    model: "FD400",
    description: "Tracción regional con buen agarre y durabilidad",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["11R22.5", "12R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 258,
  },
  {
    id: "fd410",
    model: "FD410",
    description: "Tracción mixta para línea y construcción ligera",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["295/75R22.5", "315/80R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 268,
  },
  {
    id: "fd415",
    model: "FD415",
    description: "Tracción cerrada para alto torque y arranque",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["11R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 262,
  },
  {
    id: "fd425",
    model: "FD425",
    description: "Llanta super ancha para posición de tracción",
    position: "traccion",
    filters: ["base-ancha", "larga-distancia"],
    sizes: ["445/50R22.5", "455/50R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 310,
  },
  {
    id: "ft105",
    model: "FT105",
    description: "Llanta eficiente en combustible para posición de remolque",
    position: "remolque",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5", "295/75R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 260,
  },
  {
    id: "ft110",
    model: "FT110",
    description: "Remolque de larga distancia con baja resistencia a la rodadura",
    position: "remolque",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 255,
  },
  {
    id: "ft115",
    model: "FT115",
    description:
      "Ultra premium eficiente, banda baja para remolque de larga distancia",
    position: "remolque",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5", "295/75R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 268,
  },
  {
    id: "ft125",
    model: "FT125+",
    description: "Llanta super ancha para posición de remolque",
    position: "remolque",
    filters: ["base-ancha", "larga-distancia"],
    sizes: ["445/50R22.5", "455/50R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 320,
  },
  {
    id: "ft120",
    model: "FT120",
    description: "Remolque multipropósito con banda estable",
    position: "remolque",
    filters: ["larga-distancia"],
    sizes: ["11R22.5", "12R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 252,
  },
  {
    id: "rlb400",
    model: "RLB400",
    description: "Llanta de hombro cerrado para posición de tracción",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["11R22.5", "295/75R22.5", "12R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 255,
  },
  {
    id: "rlb450",
    model: "RLB450",
    description: "Tracción reforzada para minería y cantera",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["11R22.5", "295/75R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 278,
  },
  {
    id: "rt500",
    model: "RT500",
    description:
      "Llanta premium perfil bajo multiposición de uso múltiple",
    position: "multiposicion",
    filters: ["todas-posiciones", "larga-distancia"],
    sizes: ["225/70R19.5", "245/70R19.5", "255/70R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 198,
  },
  {
    id: "rt600",
    model: "RT600",
    description: "Multiposición urbana y regional para bus",
    position: "multiposicion",
    filters: ["todas-posiciones"],
    sizes: ["225/70R19.5", "245/70R19.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 205,
  },
  {
    id: "rt510",
    model: "RT510",
    description: "Perfil bajo para distribución y pickup pesado",
    position: "multiposicion",
    filters: ["todas-posiciones"],
    sizes: ["255/70R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 212,
  },
  {
    id: "tr100",
    model: "TR100",
    description:
      "Ultra premium banda baja para remolque de larga distancia",
    position: "remolque",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5", "295/75R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 272,
  },
  {
    id: "tr200",
    model: "TR200",
    description: "Remolque SmartWay® de alto rendimiento",
    position: "remolque",
    filters: ["larga-distancia", "eficiencia-combustible"],
    sizes: ["11R22.5"],
    smartway: true,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 265,
  },
  {
    id: "rr202",
    model: "RR202",
    description: "Tracción off-road ligero para obra y terracería",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["11R22.5", "12R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 288,
  },
  {
    id: "rr900",
    model: "RR900",
    description: "Tracción severa para aplicaciones exigentes",
    position: "traccion",
    filters: ["larga-distancia"],
    sizes: ["295/75R22.5"],
    smartway: false,
    image: CATALOG_IMAGE,
    detailImage: DETAIL_TREAD_IMAGE,
    priceFrom: 295,
  },
];
