CREATE TABLE coches(
	id serial NOT NULL PRIMARY KEY,
	marca varchar(255),
	modelo varchar(255),
	eficiencia float,
	rangokm int,
	totalPower int,
	chargePower float
);
/* En la tabla, las unidades de los valores son:
 - eficiencia (kWh/100km)
 - rangokm (km)
 - totalPower (kW)
 - chargePower (kW AC)*/

INSERT INTO coches (marca, modelo, eficiencia, rangokm, totalPower, chargePower)
VALUES ('Audi', 'e-tron 55 quattro', 23.2, 360, 300, 11),
		('BMW', 'i3 120 Ah', 16.1, 235, 125, 11),
		('BMW', 'i3s 120 Ah', 16.5, 230, 135, 11),
		('Citroen', 'C-Zero', 16.1, 90, 49, 3.7),
		('Hyundai', 'IONIQ Electric', 14.4, 195, 88, 6.6),
		('Hyundai', 'Kona Electric 39 kWh', 15.7, 250, 100, 7.2),
		('Hyundai', 'Kona Electric 64 kWh', 16.0, 400, 150, 7.2),
		('Jaguar', 'I-Pace', 22.3, 380, 294, 7.4),
		('Kia', 'e-Niro 64 kWh', 17.1, 375, 150, 7.2),
		('Kia', 'Soul EV', 117.1, 175, 81, 6.6),
		('Nissan', 'e-NV200 Evalia', 20.0, 190, 80, 6.6),
		('Nissan', 'Leaf', 16.5, 230, 110, 6.6),
		('Opel', 'Ampera-e', 16.8, 345, 150, 7.4),
		('Peugeot', 'iOn', 16.1, 90, 47, 3.7),
		('Renault', 'Kangoo Maxi ZE 33', 18.8, 165, 44, 7.4),
		('Renault', 'Zoe R110', 15.8, 260, 80, 22),
		('Renault', 'Zoe R90', 15.8, 260, 68, 22),
		('Smart', 'EQ forfour', 18.6, 90, 60, 4.6),
		('Smart', 'EQ fortwo cabrio', 17.6, 95, 60, 4.6),
		('Smart', 'EQ fortwo coupe', 15.9, 105, 60, 4.6),
		('Tesla', 'Model 3 Long Range Dual Motor', 15.6, 475, 258, 11), 
		('Tesla', 'Model 3 Long Range Performance', 16.4, 450, 340, 11),
		('Tesla', 'Model 3 Long Range RWD', 15.3, 485, 211, 11),
		('Tesla', 'Model 3 Standard Range Plus', 14.9, 370, 175, 11),
		('Tesla', 'Model S Long Range', 18.1, 525, 350, 16.5),
		('Tesla', 'Model S Ludicrous Performance', 18.6, 510, 451, 16.5),
		('Tesla', 'Model S Performance', 18.6, 510, 451, 16.5),
		('Tesla', 'Model S Standard Range', 17.5, 415, 250, 16.5),
		('Tesla', 'Model X Long Range', 20.7, 460, 350, 16.5),
		('Tesla', 'Model X Ludicrous Performance', 21.3, 445, 451, 16.5),
		('Tesla', 'Model X Performance', 21.3, 445, 451, 16.5),
		('Tesla', 'Model X Standard Range', 20.4, 355, 250, 16.5),
		('Volkswagen', 'e-Golf', 16.8, 190, 100, 7.2),
		('Volkswagen', 'e-Up!', 16.8, 95, 60, 3.7);