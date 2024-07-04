interface DataStructure {
  [key: string]: {
    provinces: string[];
    districts: {
      [key: string]: string[];
    };
  };
}


const data: DataStructure  = {
    Amazonas: {
      provinces: ['Chachapoyas', 'Bagua', 'Bongará', 'Condorcanqui', 'Luya', 'Rodríguez de Mendoza', 'Utcubamba'],
      districts: {
        Chachapoyas: ['Asunción', 'Balsas', 'Chachapoyas', 'Cheto', 'Chiliquín', 'Chuquibamba', 'Granada', 'Huancas', 'La Jalca', 'Leimebamba', 'Levanto', 'Magdalena', 'Mariscal Castilla', 'Molinopampa', 'Montevideo', 'Olleros', 'Quinjalca', 'San Francisco de Daguas', 'San Isidro de Maino', 'Soloco', 'Sonche'],
        Bagua: ['Aramango', 'Bagua', 'Copallín', 'El Parco', 'Imaza', 'La Peca'],
        // Agregar más districts para cada provincia...
      }
    },
    Ancash: {
      provinces: ['Huaraz', 'Aija', 'Antonio Raymondi', 'Asunción', 'Bolognesi', 'Carhuaz', 'Carlos Fermín Fitzcarrald', 'Casma', 'Corongo', 'Huari', 'Huarmey', 'Huaylas', 'Mariscal Luzuriaga', 'Ocros', 'Pallasca', 'Pomabamba', 'Recuay', 'Santa', 'Sihuas', 'Yungay'],
      districts: {
        Huaraz: ['Cochabamba', 'Colcabamba', 'Huanchay', 'Huaraz', 'Independencia', 'Jangas', 'La Libertad', 'Olleros', 'Pampas Grande', 'Pariacoto', 'Pira', 'Tarica'],
        Aija: ['Aija', 'Coris', 'Huacllán', 'La Merced', 'Succha'],
        // Agregar más districts para cada provincia...
      }
    },
    Apurimac: {
      provinces: ['Abancay', 'Andahuaylas', 'Antabamba', 'Aymaraes', 'Cotabambas', 'Chincheros', 'Grau'],
      districts: {
        Abancay: ['Abancay', 'Chacoche', 'Circa', 'Curahuasi', 'Huanipaca', 'Lambrama', 'Pichirhua', 'San Pedro de Cachora', 'Tamburco'],
        Andahuaylas: ['Andahuaylas', 'Andarapa', 'Chiara', 'Huancarama', 'Huancaray', 'Huayana', 'Kishuara', 'Pacobamba', 'Pacucha', 'Pampachiri', 'Pomacocha', 'San Antonio de Cachi', 'San Jerónimo', 'San Miguel de Chaccrampa', 'Santa María de Chicmo', 'Talavera', 'Tumay Huaraca', 'Turpo'],
        // Agregar más districts para cada provincia...
      }
    },
    Arequipa: {
      provinces: ['Arequipa', 'Camaná', 'Caravelí', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Unión'],
      districts: {
        Arequipa: ['Alto Selva Alegre', 'Arequipa', 'Cayma', 'Cerro Colorado', 'Characato', 'Chiguata', 'Jacobo Hunter', 'José Luis Bustamante y Rivero', 'La Joya', 'Mariano Melgar', 'Miraflores', 'Mollebaya', 'Paucarpata', 'Pocsi', 'Polobaya', 'Quequeña', 'Sabandía', 'Sachaca', 'San Juan de Siguas', 'San Juan de Tarucani', 'Santa Isabel de Siguas', 'Santa Rita de Siguas', 'Socabaya', 'Tiabaya', 'Uchumayo', 'Vítor', 'Yarabamba', 'Yura'],
        Camaná: ['Camaná', 'José María Quimper', 'Mariano Nicolás Valcárcel', 'Mariscal Cáceres', 'Nicolás de Piérola', 'Ocoña', 'Quilca', 'Samuel Pastor'],
        // Agregar más districts para cada provincia...
      }
    },
    Ayacucho: {
      provinces: ['Huamanga', 'Cangallo', 'Huanca Sancos', 'Huanta', 'La Mar', 'Lucanas', 'Parinacochas', 'Páucar del Sara Sara', 'Sucre', 'Víctor Fajardo', 'Vilcas Huamán'],
      districts: {
        Huamanga: ['Acocro', 'Acos Vinchos', 'Andrés Avelino Cáceres Dorregaray', 'Ayacucho', 'Carmen Alto', 'Chiara', 'Jesús Nazareno', 'Ocros', 'Pacaycasa', 'Quinua', 'San José de Ticllas', 'San Juan Bautista', 'Santiago de Pischa', 'Socos', 'Tambillo', 'Vinchos'],
        Cangallo: ['Cangallo', 'Chuschi', 'Los Morochucos', 'María Parado de Bellido', 'Paras', 'Totos'],
        // Agregar más districts para cada provincia...
      }
    },
    Cajamarca: {
      provinces: ['Cajamarca', 'Cajabamba', 'Celendín', 'Chota', 'Contumazá', 'Cutervo', 'Hualgayoc', 'Jaén', 'San Ignacio', 'San Marcos', 'San Miguel', 'San Pablo', 'Santa Cruz'],
      districts: {
        Cajamarca: ['Asunción', 'Cajamarca', 'Chetilla', 'Cospán', 'Encañada', 'Jesús', 'Llacanora', 'Los Baños del Inca', 'Magdalena', 'Matara', 'Namora', 'San Juan'],
        Cajabamba: ['Cachachi', 'Cajabamba', 'Condebamba', 'Sitacocha'],
        // Agregar más districts para cada provincia...
      }
    },
    Callao: {
      provinces: ['Callao'],
      districts: {
        Callao: ['Bellavista', 'Callao', 'Carmen de La Legua Reynoso', 'La Perla', 'La Punta', 'Ventanilla'],
      }
    },
    Cusco: {
      provinces: ['Cusco', 'Acomayo', 'Anta', 'Calca', 'Canas', 'Canchis', 'Chumbivilcas', 'Espinar', 'La Convención', 'Paruro', 'Paucartambo', 'Quispicanchi', 'Urubamba'],
      districts: {
        Cusco: ['Ccorca', 'Cusco', 'Poroy', 'San Jerónimo', 'San Sebastián', 'Santiago', 'Saylla', 'Wanchaq'],
        Acomayo: ['Acomayo', 'Acopia', 'Acos', 'Mosoc Llacta', 'Pomacanchi', 'Rondocan', 'Sangarará'],
        // Agregar más districts para cada provincia...
      }
    },
    Huancavelica: {
      provinces: ['Huancavelica', 'Acobamba', 'Angaraes', 'Castrovirreyna', 'Churcampa', 'Huaytará', 'Tayacaja'],
      districts: {
        Huancavelica: ['Acobambilla', 'Acoria', 'Conayca', 'Cuenca', 'Huachocolpa', 'Huando', 'Huancavelica', 'Huayllahuara', 'Izcuchaca', 'Laria', 'Manta', 'Mariscal Cáceres', 'Moya', 'Nuevo Occoro', 'Palca', 'Pilchaca', 'Vilca', 'Yauli', 'Ascensión'],
        Acobamba: ['Acobamba', 'Andabamba', 'Anta', 'Caja', 'Marcas', 'Paucara', 'Pomacocha', 'Rosario'],
        // Agregar más districts para cada provincia...
      }
    },
    Huánuco: {
      provinces: ['Huánuco', 'Ambo', 'Dos de Mayo', 'Huacaybamba', 'Huamalíes', 'Leoncio Prado', 'Marañón', 'Pachitea', 'Puerto Inca', 'Lauricocha', 'Yarowilca'],
      districts: {
        Huánuco: ['Chinchao', 'Churubamba', 'Huánuco', 'Margos', 'Quisqui', 'San Francisco de Cayrán', 'San Pedro de Chaulán', 'Santa María del Valle', 'Yarumayo'],
        Ambo: ['Ambo', 'Cayna', 'Colpas', 'Conchamarca', 'Huacar', 'San Francisco', 'San Rafael', 'Tomay Kichwa'],
        // Agregar más districts para cada provincia...
      }
    },
    Ica: {
      provinces: ['Ica', 'Chincha', 'Nazca', 'Palpa', 'Pisco'],
      districts: {
        Ica: ['Ica', 'La Tinguiña', 'Los Aquijes', 'Ocucaje', 'Pachacutec', 'Parcona', 'Pueblo Nuevo', 'Salas', 'San José de los Molinos', 'San Juan Bautista', 'Santiago', 'Subtanjalla', 'Tate', 'Yauca del Rosario'],
        Chincha: ['Alto Larán', 'Chavín', 'Chincha Alta', 'Chincha Baja', 'El Carmen', 'Grocio Prado', 'Pueblo Nuevo', 'San Juan de Yanac', 'San Pedro de Huacarpana', 'Sunampe', 'Tambo de Mora'],
        // Agregar más districts para cada provincia...
      }
    },
    Junin: {
      provinces: ['Huancayo', 'Concepción', 'Chanchamayo', 'Jauja', 'Junín', 'Satipo', 'Tarma', 'Yauli', 'Chupaca'],
      districts: {
        Huancayo: ['Carhuacallanga', 'Chacapampa', 'Chicche', 'Chilca', 'Chongos Alto', 'Chupuro', 'Colca', 'Cullhuas', 'El Tambo', 'Huacrapuquio', 'Hualhuas', 'Huancán', 'Huancayo', 'Huasicancha', 'Huayucachi', 'Ingenio', 'Pariahuanca', 'Pilcomayo', 'Pucará', 'Quichuay', 'Quilcas', 'San Agustín de Cajas', 'San Jerónimo de Tunán', 'San Pedro de Saño', 'Santo Domingo de Acobamba', 'Sapallanga', 'Sicaya', 'Viques'],
        Concepción: ['Aco', 'Andamarca', 'Chambara', 'Cochas', 'Comas', 'Concepción', 'Heroinas Toledo', 'Manzanares', 'Mariscal Castilla', 'Matahuasi', 'Mito', 'Nueve de Julio', 'Orcotuna', 'San José de Quero', 'Santa Rosa de Ocopa'],
        // Agregar más districts para cada provincia...
      }
    },
    La_Libertad: {
      provinces: ['Trujillo', 'Ascope', 'Bolívar', 'Chepén', 'Julcán', 'Otuzco', 'Pacasmayo', 'Pataz', 'Sánchez Carrión', 'Santiago de Chuco', 'Gran Chimú', 'Viru'],
      districts: {
        Trujillo: ['El Porvenir', 'Florencia de Mora', 'Huanchaco', 'La Esperanza', 'Laredo', 'Moche', 'Poroto', 'Salaverry', 'Simbal', 'Trujillo', 'Víctor Larco Herrera'],
        Ascope: ['Ascope', 'Casa Grande', 'Chicama', 'Chocope', 'Magdalena de Cao', 'Paiján', 'Rázuri', 'Santiago de Cao'],
        // Agregar más districts para cada provincia...
      }
    },
    Lambayeque: {
      provinces: ['Chiclayo', 'Ferreñafe', 'Lambayeque'],
      districts: {
        Chiclayo: ['Chiclayo', 'Chongoyape', 'Eten', 'Eten Puerto', 'José Leonardo Ortiz', 'La Victoria', 'Lagunas', 'Monsefú', 'Nueva Arica', 'Oyotún', 'Picsi', 'Pimentel', 'Pomalca', 'Pucalá', 'Reque', 'Santa Rosa', 'Saña', 'Cayaltí', 'Patapo', 'Pomalca', 'Pucalá', 'Tumán'],
        Ferreñafe: ['Cañaris', 'Ferreñafe', 'Incahuasi', 'Manuel Antonio Mesones Muro', 'Pitipo', 'Pueblo Nuevo'],
        // Agregar más districts para cada provincia...
      }
    },
    Lima: {
      provinces: ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochirí', 'Huaura', 'Oyón', 'Yauyos'],
      districts: {
        Lima: ['Lima', 'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel', 'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'],
        Barranca: ['Barranca', 'Paramonga', 'Pativilca', 'Supe', 'Supe Puerto'],
        // Agregar más districts para cada provincia...
      }
    },
    Loreto: {
      provinces: ['Maynas', 'Alto Amazonas', 'Loreto', 'Mariscal Ramón Castilla', 'Requena', 'Ucayali', 'Datem del Marañón', 'Putumayo'],
      districts: {
        Maynas: ['Iquitos', 'Alto Nanay', 'Fernando Lores', 'Indiana', 'Las Amazonas', 'Mazán', 'Napo', 'Punchana', 'Torres Causana', 'Belén', 'San Juan Bautista'],
        Alto_Amazonas: ['Yurimaguas', 'Balsapuerto', 'Jeberos', 'Lagunas', 'Santa Cruz', 'Teniente César López Rojas'],
        // Agregar más districts para cada provincia...
      }
    },
    Madre_de_Dios: {
      provinces: ['Tambopata', 'Manu', 'Tahuamanu'],
      districts: {
        Tambopata: ['Tambopata', 'Inambari', 'Las Piedras', 'Laberinto'],
        Manu: ['Manu', 'Fitzcarrald', 'Madre de Dios', 'Huepetuhe'],
        // Agregar más districts para cada provincia...
      }
    },
    Moquegua: {
      provinces: ['Mariscal Nieto', 'General Sánchez Cerro', 'Ilo'],
      districts: {
        Mariscal_Nieto: ['Moquegua', 'Carumas', 'Cuchumbaya', 'Samegua', 'San Cristóbal', 'Torata'],
        General_Sánchez_Cerro: ['Omate', 'Chojata', 'Coalaque', 'Ichuña', 'La Capilla', 'Lloque', 'Matalaque', 'Puquina', 'Quinistaquillas', 'Ubinas', 'Yunga'],
        // Agregar más districts para cada provincia...
      }
    },
    Pasco: {
      provinces: ['Pasco', 'Daniel Alcides Carrión', 'Oxapampa'],
      districts: {
        Pasco: ['Chaupimarca', 'Huachón', 'Huariaca', 'Huayllay', 'Ninacaca', 'Pallanchacra', 'Paucartambo', 'San Francisco de Asís de Yarusyacán', 'Simón Bolívar', 'Ticlacayán', 'Tinyahuarco', 'Vicco', 'Yanacancha'],
        Daniel_Alcides_Carrión: ['Yanahuanca', 'Chacayan', 'Goyllarisquizga', 'Paucar', 'San Pedro de Pillao', 'Santa Ana de Tusi', 'Tapuc', 'Vilcabamba'],
        // Agregar más districts para cada provincia...
      }
    },
    Piura: {
      provinces: ['Piura', 'Ayabaca', 'Huancabamba', 'Morropón', 'Paita', 'Sullana', 'Talara', 'Sechura'],
      districts: {
        Piura: ['Piura', 'Castilla', 'Catacaos', 'Cura Mori', 'El Tallán', 'La Arena', 'La Unión', 'Las Lomas', 'Tambo Grande'],
        Ayabaca: ['Ayabaca', 'Frias', 'Jilili', 'Lagunas', 'Montero', 'Pacaipampa', 'Paimas', 'Sapillica', 'Sicchez', 'Suyo'],
        // Agregar más districts para cada provincia...
      }
    },
    Puno: {
      provinces: ['Puno', 'Azángaro', 'Carabaya', 'Chucuito', 'El Collao', 'Huancané', 'Lampa', 'Melgar', 'Moho', 'San Antonio de Putina', 'San Román', 'Sandia', 'Yunguyo'],
      districts: {
        Puno: ['Ácora', 'Amantani', 'Atuncolla', 'Capachica', 'Chucuito', 'Coata', 'Huata', 'Mañazo', 'Paucarcolla', 'Pichacani', 'Platería', 'Puno', 'San Antonio', 'Tiquillaca', 'Vilque'],
        Azángaro: ['Achaya', 'Arapa', 'Asillo', 'Azángaro', 'Caminaca', 'Chupa', 'José Domingo Choquehuanca', 'Muñani', 'Potoni', 'Saman', 'San Antón', 'San José', 'San Juan de Salinas', 'Santiago de Pupuja', 'Tirapata'],
        // Agregar más districts para cada provincia...
      }
    },
    San_Martin: {
      provinces: ['Moyobamba', 'Bellavista', 'El Dorado', 'Huallaga', 'Lamas', 'Mariscal Cáceres', 'Picota', 'Rioja', 'San Martín', 'Tocache'],
      districts: {
        Moyobamba: ['Calzada', 'Habana', 'Jepelacio', 'Moyobamba', 'Soritor', 'Yantaló'],
        Bellavista: ['Alto Biavo', 'Bajo Biavo', 'Bellavista', 'Huallaga', 'San Pablo', 'San Rafael'],
        // Agregar más districts para cada provincia...
      }
    },
    Tacna: {
      provinces: ['Tacna', 'Candarave', 'Jorge Basadre', 'Tarata'],
      districts: {
        Tacna: ['Alto de la Alianza', 'Calana', 'Ciudad Nueva', 'Coronel Gregorio Albarracín Lanchipa', 'Inclán', 'Pachía', 'Palca', 'Pocollay', 'Sama', 'Tacna'],
        Candarave: ['Cairani', 'Camilaca', 'Candarave', 'Curibaya', 'Huanuara', 'Quilahuani'],
        // Agregar más districts para cada provincia...
      }
    },
    Tumbes: {
      provinces: ['Tumbes', 'Contralmirante Villar', 'Zarumilla'],
      districts: {
        Tumbes: ['Corrales', 'La Cruz', 'Pampas de Hospital', 'San Jacinto', 'San Juan de la Virgen', 'Tumbes'],
        Contralmirante_Villar: ['Casitas', 'Zorritos'],
        // Agregar más districts para cada provincia...
      }
    },
    Ucayali: {
      provinces: ['Coronel Portillo', 'Atalaya', 'Padre Abad', 'Purús'],
      districts: {
        Coronel_Portillo: ['Callería', 'Campoverde', 'Iparía', 'Masisea', 'Yarinacocha', 'Nueva Requena', 'Manantay'],
        Atalaya: ['Raimondi', 'Sepahua', 'Tahuanía', 'Yurúa'],
        // Agregar más districts para cada provincia...
      }
    },
  };
  

export default data;