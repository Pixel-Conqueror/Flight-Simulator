import { Icon } from "leaflet";

// Création d'une icône d'avion personnalisée
export const createPlaneIcon = (heading: number) => {
	return new Icon({
		iconUrl:
			"data:image/svg+xml;base64," +
			btoa(`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(${heading} 12 12)">
          <path d="M22 16v-2l-8.5-5V3.5C13.5 2.67 12.83 2 12 2s-1.5.67-1.5 1.5V9l-8.5 5v2l8.5-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13.5 19v-5.5L22 16z" fill="#2563eb"/>
        </g>
      </svg>
    `),
		iconSize: [24, 24],
		iconAnchor: [12, 12],
		popupAnchor: [0, -12],
	});
};

// Icône d'avion par défaut (direction nord)
export const defaultPlaneIcon = createPlaneIcon(0);
