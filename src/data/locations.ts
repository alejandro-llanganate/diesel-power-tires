export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  hours: string;
};

export const WHATSAPP_NUMBER = "593999660912";

export const branches: Branch[] = [
  {
    id: "daule",
    name: "Sucursal Vía a Daule",
    address: "Vía a Daule km 5.5 y Calle Quinta",
    phone: "0999660912",
    lat: -2.1834,
    lng: -79.8882,
    hours: "Lun–Sáb 8:00 – 18:00",
  },
  {
    id: "duran",
    name: "Sucursal Vía Durán",
    address: "Vía Durán Tambo km 26",
    phone: "0999660912",
    lat: -2.1698,
    lng: -79.8345,
    hours: "Lun–Sáb 8:00 – 18:00",
  },
];
