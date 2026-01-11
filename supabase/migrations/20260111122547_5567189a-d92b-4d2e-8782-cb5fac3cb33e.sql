
-- Clear existing data and insert all 49 animals
DELETE FROM checklist_templates;
DELETE FROM animal_warnings;
DELETE FROM animal_diseases;
DELETE FROM animal_food;
DELETE FROM animal_requirements;
DELETE FROM animals;

-- REPTILES & TURTLES (16 animals)
INSERT INTO animals (namn, vetenskapligt_namn, kategori, svårighet, aktivitet, beskrivning, livslängd_år, emoji, theme) VALUES
('Leopardgecko', 'Eublepharis macularius', 'Reptil', 'Nybörjare', 'Nattaktiv', 'En tålig och populär gecko med lugnt temperament. Perfekt för nybörjare inom reptilhållning.', '15-20', '🦎', 'gecko'),
('Ögonfransgecko', 'Correlophus ciliatus', 'Reptil', 'Nybörjare', 'Nattaktiv', 'Trädlevande gecko med lugnt temperament. Kräver högre luftfuktighet.', '15-20', '🦎', 'gecko'),
('Green Iguana', 'Iguana iguana', 'Reptil', 'Avancerad', 'Dagaktiv', 'En stor trädlevande ödla som kräver mycket utrymme, värme och UVB. Inte ett nybörjardjur.', '15-20', '🦎', 'gecko'),
('Rhino Iguana', 'Cyclura cornuta', 'Reptil', 'Avancerad', 'Dagaktiv', 'En kraftig marklevande leguan med lugnare temperament men höga krav.', '20-25', '🦎', 'gecko'),
('Tegu', 'Salvator merianae', 'Reptil', 'Avancerad', 'Dagaktiv', 'En mycket intelligent och stor ödla som kan bli tam men kräver mycket skötsel.', '15-20', '🦎', 'gecko'),
('Komodovaran', 'Varanus komodoensis', 'Reptil', 'Avancerad', 'Dagaktiv', 'Världens största ödla. Endast för utbildningssyfte - ej privat hållning.', '30+', '🦎', 'gecko'),
('Red Bearded Dragon', 'Pogona vitticeps (red morph)', 'Reptil', 'Nybörjare', 'Dagaktiv', 'En färgvariant av skäggagam med röd ton. Lättskött och mycket populär.', '10-15', '🦎', 'gecko'),
('Dwarf Bearded Dragon', 'Pogona minor', 'Reptil', 'Medel', 'Dagaktiv', 'Mindre skäggagam-art med liknande krav men mindre utrymme.', '8-12', '🦎', 'gecko'),
('Mountain Caiman', 'Paleosuchus trigonatus', 'Reptil', 'Avancerad', 'Nattaktiv', 'En mindre kajmanart som lever i bergiga områden. Kräver specialiserad skötsel.', '25-30', '🐊', 'turtle'),
('Sulcata sköldpadda', 'Centrochelys sulcata', 'Reptil', 'Avancerad', 'Dagaktiv', 'En av världens största landsköldpaddor. Kräver extremt mycket plats.', '70-100', '🐢', 'turtle'),
('Snapping Turtle', 'Chelydra serpentina', 'Reptil', 'Avancerad', 'Dagaktiv', 'Aggressiv vattensköldpadda med kraftigt bett. Endast för erfarna.', '30-50', '🐢', 'turtle'),
('Musk Turtle', 'Sternotherus odoratus', 'Reptil', 'Medel', 'Nattaktiv', 'Liten vattensköldpadda med mildare temperament.', '20-30', '🐢', 'turtle'),
('Turtles (flera arter)', 'Testudines', 'Reptil', 'Medel', 'Dagaktiv', 'Samlingspost för vanliga vattensköldpaddor med varierande krav.', '20-50', '🐢', 'turtle'),
('Tortoises (flera arter)', 'Testudinidae', 'Reptil', 'Medel', 'Dagaktiv', 'Samlingspost för landsköldpaddor med varierande krav.', '40-100', '🐢', 'turtle'),
('Alligator', 'Alligator mississippiensis', 'Reptil', 'Avancerad', 'Dagaktiv', 'Stort rovdjur – endast utbildningsinformation. Ej privat hållning.', '35-50', '🐊', 'turtle'),
('Kajman', 'Caiman crocodilus', 'Reptil', 'Avancerad', 'Nattaktiv', 'Mindre krokodildjur, ej lämplig som husdjur utan specialtillstånd.', '30-40', '🐊', 'turtle'),

-- AMPHIBIANS (2 animals)
('Grodor', 'Anura', 'Groddjur', 'Medel', 'Nattaktiv', 'Grodor är fascinerande groddjur som kräver fuktiga miljöer och specialiserad kost.', '8-15', '🐸', 'fish'),
('Stora paddor', 'Bufonidae', 'Groddjur', 'Medel', 'Nattaktiv', 'Paddor är robusta groddjur med torra skinn som trivs i terrarium.', '10-15', '🐸', 'fish'),

-- FISH & MARINE (3 animals)
('Hajar', 'Selachimorpha', 'Fisk', 'Avancerad', 'Dagaktiv', 'Hajar kräver enorma akvarier och specialiserad skötsel. Endast för proffs.', '20-30', '🦈', 'fish'),
('Fiskarter (flera)', 'Actinopterygii', 'Fisk', 'Nybörjare', 'Dagaktiv', 'Samling av vanliga akvariefiskar med varierande krav.', '5-10', '🐟', 'fish'),
('Krabbor', 'Brachyura', 'Fisk', 'Medel', 'Nattaktiv', 'Krabbor är fascinerande kräftdjur som kan hållas i paludarier.', '3-8', '🦀', 'fish'),

-- BIRDS (8 animals)
('Kycklingar', 'Gallus gallus domesticus', 'Fågel', 'Nybörjare', 'Dagaktiv', 'Sociala och lättskötta fåglar som ger ägg och sällskap.', '5-10', '🐔', 'bird'),
('Tuppar', 'Gallus gallus domesticus', 'Fågel', 'Medel', 'Dagaktiv', 'Höns med dramatisk personlighet. Kan vara territoriella.', '5-10', '🐓', 'bird'),
('Kalkon', 'Meleagris gallopavo', 'Fågel', 'Medel', 'Dagaktiv', 'Stora, sociala fåglar som kräver mycket utrymme.', '8-12', '🦃', 'bird'),
('Emu', 'Dromaius novaehollandiae', 'Fågel', 'Avancerad', 'Dagaktiv', 'Australiens största fågel. Kräver enormt utrymme.', '15-25', '🪶', 'bird'),
('Ugglor', 'Strigiformes', 'Fågel', 'Avancerad', 'Nattaktiv', 'Nattaktiva rovfåglar med speciella behov. Kräver tillstånd.', '15-25', '🦉', 'bird'),
('Ankor', 'Anas platyrhynchos domesticus', 'Fågel', 'Nybörjare', 'Dagaktiv', 'Sociala vattenfåglar som behöver tillgång till bad.', '8-12', '🦆', 'bird'),
('Macaws (ara-papegojor)', 'Ara', 'Fågel', 'Avancerad', 'Dagaktiv', 'Stora, färgglada papegojor med hög intelligens och långa liv.', '50-80', '🦜', 'bird'),
('Papegojor', 'Psittaciformes', 'Fågel', 'Medel', 'Dagaktiv', 'Intelligenta och sociala fåglar som kräver mental stimulans.', '20-50', '🦜', 'bird'),

-- DOMESTIC MAMMALS (4 animals)
('Hund', 'Canis lupus familiaris', 'Däggdjur', 'Nybörjare', 'Dagaktiv', 'Ett lojalt husdjur med många olika raser och storlekar. Kräver motion och socialisering.', '10-15', '🐕', 'hamster'),
('Katt', 'Felis catus', 'Däggdjur', 'Nybörjare', 'Nattaktiv', 'Oberoende husdjur men social. Kräver leksaker och stimulerande miljö.', '12-20', '🐱', 'hamster'),
('Kanin', 'Oryctolagus cuniculus', 'Däggdjur', 'Medel', 'Dagaktiv', 'Socialt och nyfiket husdjur. Kräver utrymme och tillsyn.', '8-12', '🐰', 'rabbit'),
('Hermelin-kanin', 'Oryctolagus cuniculus (Ermine)', 'Däggdjur', 'Medel', 'Dagaktiv', 'En liten, vit kaninras med röda eller blå ögon.', '8-12', '🐇', 'rabbit'),

-- FARM MAMMALS (3 animals)
('Gris', 'Sus scrofa domesticus', 'Däggdjur', 'Medel', 'Dagaktiv', 'Intelligenta och sociala djur som trivs i flock. Behöver stimulerande miljö.', '10-15', '🐷', 'hamster'),
('Får', 'Ovis aries', 'Däggdjur', 'Nybörjare', 'Dagaktiv', 'Flockdjur som behöver betesmarker, trygghet och regelbunden skötsel.', '12-15', '🐑', 'hamster'),
('Highland Cow', 'Bos taurus', 'Däggdjur', 'Medel', 'Dagaktiv', 'En tålig ko med lång päls och horn, känd för att klara kalla klimat.', '15-20', '🐄', 'hamster'),

-- WILD MAMMALS (16 animals)
('Räv', 'Vulpes vulpes', 'Däggdjur', 'Avancerad', 'Nattaktiv', 'En liten till medelstor rovdjur med röd päls, smart och nyfiken.', '3-10', '🦊', 'hamster'),
('Varg', 'Canis lupus', 'Däggdjur', 'Avancerad', 'Nattaktiv', 'Stort rovdjur, lever i flock och har komplex social struktur.', '6-16', '🐺', 'hamster'),
('Lejon', 'Panthera leo', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Stort rovdjur, socialt och lever i flockar (prider). Endast zoo/utbildning.', '10-20', '🦁', 'hamster'),
('Svart panter', 'Panthera pardus melanistic', 'Däggdjur', 'Avancerad', 'Nattaktiv', 'En melanistisk leopard med helt svart päls, kraftfull och smidig.', '12-20', '🐆', 'hamster'),
('Röd panda', 'Ailurus fulgens', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Ett litet, rödfärgat däggdjur som äter mest bambu, trivs i träd.', '8-14', '🦝', 'hamster'),
('Jättepanda', 'Ailuropoda melanoleuca', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Ikonisk björnart som äter bambu. Endast i djurparker och reservat.', '20-30', '🐼', 'hamster'),
('Kapybara', 'Hydrochoerus hydrochaeris', 'Däggdjur', 'Medel', 'Dagaktiv', 'Världens största gnagare. Social och kräver vatten.', '8-12', '🦫', 'hamster'),
('Känguru', 'Macropus', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Australiens ikoniska hoppande däggdjur. Kräver stort utrymme.', '15-25', '🦘', 'hamster'),
('Sengångare', 'Bradypus', 'Däggdjur', 'Avancerad', 'Nattaktiv', 'Långsamma trädlevande däggdjur med speciella kostbehov.', '15-25', '🦥', 'hamster'),
('Jätte myrslok', 'Myrmecophaga tridactyla', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Stor, unik däggdjur som lever på myror och termiter.', '12-18', '🐜', 'hamster'),
('Apor', 'Primates', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Intelligenta primater med komplexa sociala behov. Kräver tillstånd.', '20-40', '🐒', 'hamster'),
('Babianer', 'Papio', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Stora, starka primater med hierarkisk social struktur.', '25-40', '🐵', 'hamster'),
('Uttrar', 'Lutrinae', 'Däggdjur', 'Avancerad', 'Dagaktiv', 'Lekfulla vattenlevande däggdjur som kräver stora vattenytor.', '10-18', '🦦', 'hamster'),
('Civetter', 'Viverridae', 'Däggdjur', 'Avancerad', 'Nattaktiv', 'Nattaktiva, kattliknande däggdjur med unika doftkörtlar.', '10-18', '🐾', 'hamster'),
('Vildsvin', 'Sus scrofa', 'Däggdjur', 'Avancerad', 'Nattaktiv', 'Vilda förfäder till tamgrisar. Kraftfulla och territoriella.', '10-18', '🐗', 'hamster');
