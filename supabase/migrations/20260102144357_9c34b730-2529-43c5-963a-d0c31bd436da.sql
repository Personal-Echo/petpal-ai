-- Add Ögonfransgecko (Crested Gecko) to animals
INSERT INTO public.animals (
  namn,
  vetenskapligt_namn,
  kategori,
  svårighet,
  aktivitet,
  emoji,
  theme,
  beskrivning,
  livslängd_år
) VALUES (
  'Ögonfransgecko',
  'Correlophus ciliatus',
  'Reptil',
  'Nybörjare',
  'Nattaktiv',
  '🦎',
  'gecko',
  'Ögonfransgeckon är en populär och lättskött reptil från Nya Kaledonien. De är kända för sina karaktäristiska ögonfransar och sin förmåga att klättra på glatta ytor. De är nattaktiva och trivs i terrarium med hög luftfuktighet.',
  '15-20'
);

-- Get the inserted animal ID and add requirements
INSERT INTO public.animal_requirements (
  animal_id,
  temperatur,
  fuktighet,
  belysning,
  bostad,
  substrat,
  beteende_aktivitet,
  beteende_social,
  beteende_lek,
  aktivitet_vaknar,
  aktivitet_sover,
  aktivitet_timmar
)
SELECT 
  id,
  '22-26°C dagtid, kan gå ner till 18°C nattetid',
  '60-80%, spreja 1-2 gånger dagligen',
  'Låg UVB-belysning rekommenderas, ej stark belysning',
  'Högt terrarium minst 45x45x60cm för en vuxen gecko',
  'Kokosfibrer, mossa eller pappershandduk',
  'Klättrare, hoppar mellan grenar och blad',
  'Kan hållas ensamma eller i par (ej två hanar)',
  'Utforska terrariet, jaga insekter',
  'Skymning, runt 18-20',
  'Dagtid, gömda bland blad',
  '4-6 timmar aktiv på natten'
FROM public.animals WHERE namn = 'Ögonfransgecko';

-- Add food data
INSERT INTO public.animal_food (animal_id, typ, frekvens, mängd)
SELECT id, 'Geckomix (CGD)', 'Varannan dag', '1-2 matskedar'
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.animal_food (animal_id, typ, frekvens, mängd)
SELECT id, 'Insekter (syrsor, kackerlackor)', '1-2 gånger per vecka', '3-5 insekter'
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.animal_food (animal_id, typ, frekvens, mängd)
SELECT id, 'Fruktmos', 'Ibland som godis', 'Liten mängd'
FROM public.animals WHERE namn = 'Ögonfransgecko';

-- Add warnings
INSERT INTO public.animal_warnings (animal_id, varning)
SELECT id, 'Håll aldrig i svansen - den kan trilla av och växer INTE tillbaka fullt ut'
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.animal_warnings (animal_id, varning)
SELECT id, 'Undvik för stark belysning och värme - de föredrar svalt och fuktigt'
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.animal_warnings (animal_id, varning)
SELECT id, 'Spreja INTE direkt på geckon - spreja väggarna och växterna'
FROM public.animals WHERE namn = 'Ögonfransgecko';

-- Add diseases
INSERT INTO public.animal_diseases (animal_id, namn, symptom, åtgärd)
SELECT id, 'Metabolisk bensjukdom (MBD)', ARRAY['Mjuka ben', 'Svaghet', 'Skakningar', 'Svårt att klättra'], 'Öka kalcium och D3-tillskott, kontakta veterinär'
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.animal_diseases (animal_id, namn, symptom, åtgärd)
SELECT id, 'Hudproblem/Ömsningsproblem', ARRAY['Kvarvarande skinn', 'Torr hud', 'Skinn runt tår'], 'Öka luftfuktigheten, hjälp försiktigt med fuktigt tops'
FROM public.animals WHERE namn = 'Ögonfransgecko';

-- Add checklist templates (using correct typ values: daglig, veckovis, inköp)
INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'daglig', 'Spreja terrariet för att hålla fukten', 1
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'daglig', 'Kontrollera att temperaturen är rätt', 2
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'daglig', 'Byt vattenkopp', 3
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'veckovis', 'Rengör terrarium och byt substrat vid behov', 1
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'veckovis', 'Ge levande insekter som tillskott', 2
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'inköp', 'Högt terrarium (minst 45x45x60cm)', 1
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'inköp', 'Geckomix (CGD) som basföda', 2
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'inköp', 'Sprejflaska för fuktighet', 3
FROM public.animals WHERE namn = 'Ögonfransgecko';

INSERT INTO public.checklist_templates (animal_id, typ, item, sort_order)
SELECT id, 'inköp', 'Växter och grenar att klättra på', 4
FROM public.animals WHERE namn = 'Ögonfransgecko';