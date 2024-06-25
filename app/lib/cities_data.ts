interface DataStructure {
  [key: string]: {
    provincias: string[];
    distritos: {
      [key: string]: string[];
    };
  };
}


const data: DataStructure  = {
    Amazonas: {
      provincias: ['Chachapoyas', 'Bagua', 'Bongará', 'Condorcanqui', 'Luya', 'Rodríguez de Mendoza', 'Utcubamba'],
      distritos: {
        Chachapoyas: ['Asunción', 'Balsas', 'Chachapoyas', 'Cheto', 'Chiliquín', 'Chuquibamba', 'Granada', 'Huancas', 'La Jalca', 'Leimebamba', 'Levanto', 'Magdalena', 'Mariscal Castilla', 'Molinopampa', 'Montevideo', 'Olleros', 'Quinjalca', 'San Francisco de Daguas', 'San Isidro de Maino', 'Soloco', 'Sonche'],
        Bagua: ['Aramango', 'Bagua', 'Copallín', 'El Parco', 'Imaza', 'La Peca'],
        // Agregar más distritos para cada provincia...
      }
    },
    Ancash: {
      provincias: ['Huaraz', 'Aija', 'Antonio Raymondi', 'Asunción', 'Bolognesi', 'Carhuaz', 'Carlos Fermín Fitzcarrald', 'Casma', 'Corongo', 'Huari', 'Huarmey', 'Huaylas', 'Mariscal Luzuriaga', 'Ocros', 'Pallasca', 'Pomabamba', 'Recuay', 'Santa', 'Sihuas', 'Yungay'],
      distritos: {
        Huaraz: ['Cochabamba', 'Colcabamba', 'Huanchay', 'Huaraz', 'Independencia', 'Jangas', 'La Libertad', 'Olleros', 'Pampas Grande', 'Pariacoto', 'Pira', 'Tarica'],
        Aija: ['Aija', 'Coris', 'Huacllán', 'La Merced', 'Succha'],
        // Agregar más distritos para cada provincia...
      }
    },
    Apurimac: {
      provincias: ['Abancay', 'Andahuaylas', 'Antabamba', 'Aymaraes', 'Cotabambas', 'Chincheros', 'Grau'],
      distritos: {
        Abancay: ['Abancay', 'Chacoche', 'Circa', 'Curahuasi', 'Huanipaca', 'Lambrama', 'Pichirhua', 'San Pedro de Cachora', 'Tamburco'],
        Andahuaylas: ['Andahuaylas', 'Andarapa', 'Chiara', 'Huancarama', 'Huancaray', 'Huayana', 'Kishuara', 'Pacobamba', 'Pacucha', 'Pampachiri', 'Pomacocha', 'San Antonio de Cachi', 'San Jerónimo', 'San Miguel de Chaccrampa', 'Santa María de Chicmo', 'Talavera', 'Tumay Huaraca', 'Turpo'],
        // Agregar más distritos para cada provincia...
      }
    },
    Arequipa: {
      provincias: ['Arequipa', 'Camaná', 'Caravelí', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Unión'],
      distritos: {
        Arequipa: ['Alto Selva Alegre', 'Arequipa', 'Cayma', 'Cerro Colorado', 'Characato', 'Chiguata', 'Jacobo Hunter', 'José Luis Bustamante y Rivero', 'La Joya', 'Mariano Melgar', 'Miraflores', 'Mollebaya', 'Paucarpata', 'Pocsi', 'Polobaya', 'Quequeña', 'Sabandía', 'Sachaca', 'San Juan de Siguas', 'San Juan de Tarucani', 'Santa Isabel de Siguas', 'Santa Rita de Siguas', 'Socabaya', 'Tiabaya', 'Uchumayo', 'Vítor', 'Yarabamba', 'Yura'],
        Camaná: ['Camaná', 'José María Quimper', 'Mariano Nicolás Valcárcel', 'Mariscal Cáceres', 'Nicolás de Piérola', 'Ocoña', 'Quilca', 'Samuel Pastor'],
        // Agregar más distritos para cada provincia...
      }
    },
    Ayacucho: {
      provincias: ['Huamanga', 'Cangallo', 'Huanca Sancos', 'Huanta', 'La Mar', 'Lucanas', 'Parinacochas', 'Páucar del Sara Sara', 'Sucre', 'Víctor Fajardo', 'Vilcas Huamán'],
      distritos: {
        Huamanga: ['Acocro', 'Acos Vinchos', 'Andrés Avelino Cáceres Dorregaray', 'Ayacucho', 'Carmen Alto', 'Chiara', 'Jesús Nazareno', 'Ocros', 'Pacaycasa', 'Quinua', 'San José de Ticllas', 'San Juan Bautista', 'Santiago de Pischa', 'Socos', 'Tambillo', 'Vinchos'],
        Cangallo: ['Cangallo', 'Chuschi', 'Los Morochucos', 'María Parado de Bellido', 'Paras', 'Totos'],
        // Agregar más distritos para cada provincia...
      }
    },
    Cajamarca: {
      provincias: ['Cajamarca', 'Cajabamba', 'Celendín', 'Chota', 'Contumazá', 'Cutervo', 'Hualgayoc', 'Jaén', 'San Ignacio', 'San Marcos', 'San Miguel', 'San Pablo', 'Santa Cruz'],
      distritos: {
        Cajamarca: ['Asunción', 'Cajamarca', 'Chetilla', 'Cospán', 'Encañada', 'Jesús', 'Llacanora', 'Los Baños del Inca', 'Magdalena', 'Matara', 'Namora', 'San Juan'],
        Cajabamba: ['Cachachi', 'Cajabamba', 'Condebamba', 'Sitacocha'],
        // Agregar más distritos para cada provincia...
      }
    },
    Callao: {
      provincias: ['Callao'],
      distritos: {
        Callao: ['Bellavista', 'Callao', 'Carmen de La Legua Reynoso', 'La Perla', 'La Punta', 'Ventanilla'],
      }
    },
    Cusco: {
      provincias: ['Cusco', 'Acomayo', 'Anta', 'Calca', 'Canas', 'Canchis', 'Chumbivilcas', 'Espinar', 'La Convención', 'Paruro', 'Paucartambo', 'Quispicanchi', 'Urubamba'],
      distritos: {
        Cusco: ['Ccorca', 'Cusco', 'Poroy', 'San Jerónimo', 'San Sebastián', 'Santiago', 'Saylla', 'Wanchaq'],
        Acomayo: ['Acomayo', 'Acopia', 'Acos', 'Mosoc Llacta', 'Pomacanchi', 'Rondocan', 'Sangarará'],
        // Agregar más distritos para cada provincia...
      }
    },
    Huancavelica: {
      provincias: ['Huancavelica', 'Acobamba', 'Angaraes', 'Castrovirreyna', 'Churcampa', 'Huaytará', 'Tayacaja'],
      distritos: {
        Huancavelica: ['Acobambilla', 'Acoria', 'Conayca', 'Cuenca', 'Huachocolpa', 'Huando', 'Huancavelica', 'Huayllahuara', 'Izcuchaca', 'Laria', 'Manta', 'Mariscal Cáceres', 'Moya', 'Nuevo Occoro', 'Palca', 'Pilchaca', 'Vilca', 'Yauli', 'Ascensión'],
        Acobamba: ['Acobamba', 'Andabamba', 'Anta', 'Caja', 'Marcas', 'Paucara', 'Pomacocha', 'Rosario'],
        // Agregar más distritos para cada provincia...
      }
    },
    Huánuco: {
      provincias: ['Huánuco', 'Ambo', 'Dos de Mayo', 'Huacaybamba', 'Huamalíes', 'Leoncio Prado', 'Marañón', 'Pachitea', 'Puerto Inca', 'Lauricocha', 'Yarowilca'],
      distritos: {
        Huánuco: ['Chinchao', 'Churubamba', 'Huánuco', 'Margos', 'Quisqui', 'San Francisco de Cayrán', 'San Pedro de Chaulán', 'Santa María del Valle', 'Yarumayo'],
        Ambo: ['Ambo', 'Cayna', 'Colpas', 'Conchamarca', 'Huacar', 'San Francisco', 'San Rafael', 'Tomay Kichwa'],
        // Agregar más distritos para cada provincia...
      }
    },
    Ica: {
      provincias: ['Ica', 'Chincha', 'Nazca', 'Palpa', 'Pisco'],
      distritos: {
        Ica: ['Ica', 'La Tinguiña', 'Los Aquijes', 'Ocucaje', 'Pachacutec', 'Parcona', 'Pueblo Nuevo', 'Salas', 'San José de los Molinos', 'San Juan Bautista', 'Santiago', 'Subtanjalla', 'Tate', 'Yauca del Rosario'],
        Chincha: ['Alto Larán', 'Chavín', 'Chincha Alta', 'Chincha Baja', 'El Carmen', 'Grocio Prado', 'Pueblo Nuevo', 'San Juan de Yanac', 'San Pedro de Huacarpana', 'Sunampe', 'Tambo de Mora'],
        // Agregar más distritos para cada provincia...
      }
    },
    Junin: {
      provincias: ['Huancayo', 'Concepción', 'Chanchamayo', 'Jauja', 'Junín', 'Satipo', 'Tarma', 'Yauli', 'Chupaca'],
      distritos: {
        Huancayo: ['Carhuacallanga', 'Chacapampa', 'Chicche', 'Chilca', 'Chongos Alto', 'Chupuro', 'Colca', 'Cullhuas', 'El Tambo', 'Huacrapuquio', 'Hualhuas', 'Huancán', 'Huancayo', 'Huasicancha', 'Huayucachi', 'Ingenio', 'Pariahuanca', 'Pilcomayo', 'Pucará', 'Quichuay', 'Quilcas', 'San Agustín de Cajas', 'San Jerónimo de Tunán', 'San Pedro de Saño', 'Santo Domingo de Acobamba', 'Sapallanga', 'Sicaya', 'Viques'],
        Concepción: ['Aco', 'Andamarca', 'Chambara', 'Cochas', 'Comas', 'Concepción', 'Heroinas Toledo', 'Manzanares', 'Mariscal Castilla', 'Matahuasi', 'Mito', 'Nueve de Julio', 'Orcotuna', 'San José de Quero', 'Santa Rosa de Ocopa'],
        // Agregar más distritos para cada provincia...
      }
    },
    La_Libertad: {
      provincias: ['Trujillo', 'Ascope', 'Bolívar', 'Chepén', 'Julcán', 'Otuzco', 'Pacasmayo', 'Pataz', 'Sánchez Carrión', 'Santiago de Chuco', 'Gran Chimú', 'Viru'],
      distritos: {
        Trujillo: ['El Porvenir', 'Florencia de Mora', 'Huanchaco', 'La Esperanza', 'Laredo', 'Moche', 'Poroto', 'Salaverry', 'Simbal', 'Trujillo', 'Víctor Larco Herrera'],
        Ascope: ['Ascope', 'Casa Grande', 'Chicama', 'Chocope', 'Magdalena de Cao', 'Paiján', 'Rázuri', 'Santiago de Cao'],
        // Agregar más distritos para cada provincia...
      }
    },
    Lambayeque: {
      provincias: ['Chiclayo', 'Ferreñafe', 'Lambayeque'],
      distritos: {
        Chiclayo: ['Chiclayo', 'Chongoyape', 'Eten', 'Eten Puerto', 'José Leonardo Ortiz', 'La Victoria', 'Lagunas', 'Monsefú', 'Nueva Arica', 'Oyotún', 'Picsi', 'Pimentel', 'Pomalca', 'Pucalá', 'Reque', 'Santa Rosa', 'Saña', 'Cayaltí', 'Patapo', 'Pomalca', 'Pucalá', 'Tumán'],
        Ferreñafe: ['Cañaris', 'Ferreñafe', 'Incahuasi', 'Manuel Antonio Mesones Muro', 'Pitipo', 'Pueblo Nuevo'],
        // Agregar más distritos para cada provincia...
      }
    },
    Lima: {
      provincias: ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochirí', 'Huaura', 'Oyón', 'Yauyos'],
      distritos: {
        Lima: ['Lima', 'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel', 'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'],
        Barranca: ['Barranca', 'Paramonga', 'Pativilca', 'Supe', 'Supe Puerto'],
        // Agregar más distritos para cada provincia...
      }
    },
    Loreto: {
      provincias: ['Maynas', 'Alto Amazonas', 'Loreto', 'Mariscal Ramón Castilla', 'Requena', 'Ucayali', 'Datem del Marañón', 'Putumayo'],
      distritos: {
        Maynas: ['Iquitos', 'Alto Nanay', 'Fernando Lores', 'Indiana', 'Las Amazonas', 'Mazán', 'Napo', 'Punchana', 'Torres Causana', 'Belén', 'San Juan Bautista'],
        Alto_Amazonas: ['Yurimaguas', 'Balsapuerto', 'Jeberos', 'Lagunas', 'Santa Cruz', 'Teniente César López Rojas'],
        // Agregar más distritos para cada provincia...
      }
    },
    Madre_de_Dios: {
      provincias: ['Tambopata', 'Manu', 'Tahuamanu'],
      distritos: {
        Tambopata: ['Tambopata', 'Inambari', 'Las Piedras', 'Laberinto'],
        Manu: ['Manu', 'Fitzcarrald', 'Madre de Dios', 'Huepetuhe'],
        // Agregar más distritos para cada provincia...
      }
    },
    Moquegua: {
      provincias: ['Mariscal Nieto', 'General Sánchez Cerro', 'Ilo'],
      distritos: {
        Mariscal_Nieto: ['Moquegua', 'Carumas', 'Cuchumbaya', 'Samegua', 'San Cristóbal', 'Torata'],
        General_Sánchez_Cerro: ['Omate', 'Chojata', 'Coalaque', 'Ichuña', 'La Capilla', 'Lloque', 'Matalaque', 'Puquina', 'Quinistaquillas', 'Ubinas', 'Yunga'],
        // Agregar más distritos para cada provincia...
      }
    },
    Pasco: {
      provincias: ['Pasco', 'Daniel Alcides Carrión', 'Oxapampa'],
      distritos: {
        Pasco: ['Chaupimarca', 'Huachón', 'Huariaca', 'Huayllay', 'Ninacaca', 'Pallanchacra', 'Paucartambo', 'San Francisco de Asís de Yarusyacán', 'Simón Bolívar', 'Ticlacayán', 'Tinyahuarco', 'Vicco', 'Yanacancha'],
        Daniel_Alcides_Carrión: ['Yanahuanca', 'Chacayan', 'Goyllarisquizga', 'Paucar', 'San Pedro de Pillao', 'Santa Ana de Tusi', 'Tapuc', 'Vilcabamba'],
        // Agregar más distritos para cada provincia...
      }
    },
    Piura: {
      provincias: ['Piura', 'Ayabaca', 'Huancabamba', 'Morropón', 'Paita', 'Sullana', 'Talara', 'Sechura'],
      distritos: {
        Piura: ['Piura', 'Castilla', 'Catacaos', 'Cura Mori', 'El Tallán', 'La Arena', 'La Unión', 'Las Lomas', 'Tambo Grande'],
        Ayabaca: ['Ayabaca', 'Frias', 'Jilili', 'Lagunas', 'Montero', 'Pacaipampa', 'Paimas', 'Sapillica', 'Sicchez', 'Suyo'],
        // Agregar más distritos para cada provincia...
      }
    },
    Puno: {
      provincias: ['Puno', 'Azángaro', 'Carabaya', 'Chucuito', 'El Collao', 'Huancané', 'Lampa', 'Melgar', 'Moho', 'San Antonio de Putina', 'San Román', 'Sandia', 'Yunguyo'],
      distritos: {
        Puno: ['Ácora', 'Amantani', 'Atuncolla', 'Capachica', 'Chucuito', 'Coata', 'Huata', 'Mañazo', 'Paucarcolla', 'Pichacani', 'Platería', 'Puno', 'San Antonio', 'Tiquillaca', 'Vilque'],
        Azángaro: ['Achaya', 'Arapa', 'Asillo', 'Azángaro', 'Caminaca', 'Chupa', 'José Domingo Choquehuanca', 'Muñani', 'Potoni', 'Saman', 'San Antón', 'San José', 'San Juan de Salinas', 'Santiago de Pupuja', 'Tirapata'],
        // Agregar más distritos para cada provincia...
      }
    },
    San_Martin: {
      provincias: ['Moyobamba', 'Bellavista', 'El Dorado', 'Huallaga', 'Lamas', 'Mariscal Cáceres', 'Picota', 'Rioja', 'San Martín', 'Tocache'],
      distritos: {
        Moyobamba: ['Calzada', 'Habana', 'Jepelacio', 'Moyobamba', 'Soritor', 'Yantaló'],
        Bellavista: ['Alto Biavo', 'Bajo Biavo', 'Bellavista', 'Huallaga', 'San Pablo', 'San Rafael'],
        // Agregar más distritos para cada provincia...
      }
    },
    Tacna: {
      provincias: ['Tacna', 'Candarave', 'Jorge Basadre', 'Tarata'],
      distritos: {
        Tacna: ['Alto de la Alianza', 'Calana', 'Ciudad Nueva', 'Coronel Gregorio Albarracín Lanchipa', 'Inclán', 'Pachía', 'Palca', 'Pocollay', 'Sama', 'Tacna'],
        Candarave: ['Cairani', 'Camilaca', 'Candarave', 'Curibaya', 'Huanuara', 'Quilahuani'],
        // Agregar más distritos para cada provincia...
      }
    },
    Tumbes: {
      provincias: ['Tumbes', 'Contralmirante Villar', 'Zarumilla'],
      distritos: {
        Tumbes: ['Corrales', 'La Cruz', 'Pampas de Hospital', 'San Jacinto', 'San Juan de la Virgen', 'Tumbes'],
        Contralmirante_Villar: ['Casitas', 'Zorritos'],
        // Agregar más distritos para cada provincia...
      }
    },
    Ucayali: {
      provincias: ['Coronel Portillo', 'Atalaya', 'Padre Abad', 'Purús'],
      distritos: {
        Coronel_Portillo: ['Callería', 'Campoverde', 'Iparía', 'Masisea', 'Yarinacocha', 'Nueva Requena', 'Manantay'],
        Atalaya: ['Raimondi', 'Sepahua', 'Tahuanía', 'Yurúa'],
        // Agregar más distritos para cada provincia...
      }
    },
  };
  

export default data;