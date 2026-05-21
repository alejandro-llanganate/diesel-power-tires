import { tires, type Tire } from "@/data/tires";

export type TireWithApiImage = Tire & {
  imageSource: "local";
};

export async function getTiresWithApiImages(): Promise<{
  tires: TireWithApiImage[];
  provider: "local";
}> {
  return {
    tires: tires.map((t) => ({ ...t, imageSource: "local" as const })),
    provider: "local",
  };
}
