import world50m from '../assets/geo-data/world-50m.json';
import { scaleLinear } from 'd3-scale';
import { useState } from 'react';
import {
	ComposableMap,
	Geographies,
	Geography,
	GeographyProps,
	Marker,
	// Markers,
	ZoomableGroup,
} from 'react-simple-maps';
import { getColor } from '../utils/colors';

const cityScale = scaleLinear().domain([0, 37843000]).range([1, 25]);

interface City {
	name: string;
	coordinates: number[];
	population: number;
}

interface BubbleMapProps extends GeographyProps {}

const BubbleMap: React.FC<BubbleMapProps> = () => {
	const [cities, setCities] = useState<City[]>([]);

	const secondaryColor = getColor('secondary');
	const lightColor = getColor('light');

	return (
		<ComposableMap
			projectionConfig={{ scale: 205 }}
			width={980}
			height={551}
			style={{
				width: '100%',
				height: 'auto',
			}}>
			<ZoomableGroup center={[0, 20]} disablePanning>
				<Geographies geography={world50m}>
					{({ geographies, projection }) =>
						geographies.map(
							(geography, i) =>
								geography.id !== 'ATA' && (
									<Geography
										key={i}
										geography={geography}
										// projection={projection}
										style={{
											default: {
												fill: lightColor as string,
												stroke: lightColor as string,
												strokeWidth: 0.75,
												outline: 'none',
											},
											hover: {
												fill: secondaryColor as string,
												stroke: secondaryColor as string,
												strokeWidth: 0.75,
												outline: 'none',
											},
											pressed: {
												fill: secondaryColor as string,
												stroke: secondaryColor as string,
												strokeWidth: 0.75,
												outline: 'none',
											},
										}}
									/>
								)
						)
					}
				</Geographies>
				{/* <Markers> */}
				{cities.map((city, i) => (
					<Marker
						key={i}
						// marker={city}
					>
						<circle
							cx={0}
							cy={0}
							r={cityScale(city.population)}
							fill={secondaryColor as string}
							stroke={secondaryColor as string}
							strokeWidth="2"
						/>
					</Marker>
				))}
				{/* </Markers> */}
			</ZoomableGroup>
		</ComposableMap>
	);
};

export default BubbleMap;
