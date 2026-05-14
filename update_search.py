import json
import os

filepath = 'search-index.json'
with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

new_articles = [
    {
        'title': 'Komunikimi i Milingonave',
        'href': 'zoologji/komunikimi_i_milingonave.html',
        'tags': ['Zoologji', 'Insekte', 'Shkencë'],
        'excerpt': 'Zbulimet e fundit shkencore tregojnë se milingonat kanë një sistem kompleks komunikimi për të paralajmëruar njëra-tjetrën mbi rreziqet, një fakt i përmendur në Kuran shekuj më parë.'
    },
    {
        'title': 'Gjurmët e Gishtave',
        'href': 'fiziologji/gjurmet_e_gishtave.html',
        'tags': ['Fiziologji', 'Anatomi', 'Shkencë'],
        'excerpt': 'Në shekullin e 19-të, u zbulua se çdo njeri ka gjurmë gishtash krejtësisht unike. Kurani e kishte theksuar rikrijimin e majave të gishtave si dëshmi e individualitetit të përkryer shekuj më parë.'
    },
    {
        'title': 'Fabrika e Gjelbër: Klorofili',
        'href': 'biologji/fabrika_e_gjelber_klorofili.html',
        'tags': ['Biologji', 'Botanikë', 'Shkencë'],
        'excerpt': 'Procesi i fotosintezës varet thellësisht nga një pigment i gjelbër quajtur klorofil. Kurani e përshkruan këtë "substancë të gjelbër" si pikënisjen e prodhimit të drithërave dhe frutave.'
    },
    {
        'title': 'Mungesa e Oksigjenit në Lartësi',
        'href': 'fiziologji/mungesa_e_oksigjenit.html',
        'tags': ['Fiziologji', 'Sistemi i Frymëmarrjes', 'Shkencë'],
        'excerpt': 'Hipoksia, gjendja ku trupi ndjen shtrëngim në gjoks dhe vështirësi në frymëmarrje kur ngjitet lart në qiell, është zbuluar vetëm me fillimet e aviacionit. Por u përmend në Kuran me detaje anatomike shumë shekuj më parë.'
    },
    {
        'title': 'Zjarri nga Druri i Gjelbër',
        'href': 'kimi/zjarri_nga_druri_i_gjelber.html',
        'tags': ['Kimi', 'Termodinamikë', 'Shkencë'],
        'excerpt': 'Si mundet një dru i gjelbër plot me ujë të ruajë energjinë që më pas kthehet në zjarr? Kurani thekson këtë proces mahnitës, duke paralajmëruar kuptimin modern të ruajtjes së energjisë.'
    }
]

existing_hrefs = [item['href'] for item in data]
added = 0
for article in new_articles:
    if article['href'] not in existing_hrefs:
        data.append(article)
        added += 1

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Added {added} articles to search index.')
