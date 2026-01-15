/* --- DATABASE --- */
const contentDB = [
    {
        id: 'diario-banana-1',
        title: 'Diário de um Banana',
        type: 'filme',
        category: 'Comédia / Família',
        year: '2010',
        cover: 'https://m.media-amazon.com/images/S/pv-target-images/53bd6d9c03d61fecdee73974365e26b3276e3b7e2fb93f9319b28eebc1c0fa26._SX1080_FMjpg_.jpg',
        description: 'Greg Heffley está destinado a grandes coisas, mas primeiro ele precisa sobreviver à coisa mais assustadora e humilhante de todas: o ensino fundamental.',
        url: 'https://drive.google.com/file/d/1qBGYMGHOShcyS0_meDv35wG4K5nzU28E/preview'
    },
    {
        id: 'diario-banana-2',
        title: 'Diário de um Banana 2',
        type: 'filme',
        category: 'Comédia / Irmãos',
        year: '2011',
        cover: 'https://m.media-amazon.com/images/S/pv-target-images/12bd2a9871c75d6abfddb48638342629f8190b81c3784e15e468eb3c96d53e31._UR1920,1080_.jpg',
        description: 'De volta às aulas, Greg e seu irmão mais velho Rodrick lidam com suas tentativas hilárias e desajeitadas de se darem bem (ou não).',
        url: 'https://drive.google.com/file/d/1uXk9Zz13N84yXOq-I-bycbMT4RUPoosP/preview'
    },
    {
        id: 'diario-banana-3',
        title: 'Diário de um Banana 3',
        type: 'filme',
        category: 'Comédia / Verão',
        year: '2012',
        cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/019b2f32-b4d6-7163-9299-3e0e72111f11/compose?aspectRatio=1.78&format=webp&width=1200',
        description: 'As férias de verão chegaram e Greg quer passar o tempo jogando videogame, mas seu pai tem outros planos para ele.',
        url: 'https://drive.google.com/file/d/17u9eihi4QzkIwzeGatm1pyAbvh8VC774/preview'
    },
    {
        id: 'stranger-things',
        title: 'Stranger Things',
        type: 'serie',
        category: 'Sci-Fi / Terror',
        year: '2016',
        cover: 'https://www.tallengestore.com/cdn/shop/products/stranger_things_12_01151e69-a27e-42c3-b339-eb3afc33a939.jpg?v=1514020430',
        description: 'Uma carta de amor aos clássicos sobrenaturais dos anos 80, Stranger Things é a história de um menino que desaparece e de uma cidade que descobre segredos sombrios.',
        ratings: { imdb: 8.7, rottenTomatoes: 91, metascore: 78 },
        isHero: true,
        seasons: {
            1: [ { title: "O desaparecimento de Will Byers", url: "https://drive.google.com/file/d/1jA0SUmrcvDJSRxTPWRkCh__yPxGXKs2Q/preview" }, { title: "A estranha da Maple Street", url: "https://drive.google.com/file/d/1pglYy77Xa8o0dYr0frDST_wtceovJKB6/preview" }, { title: "Caramba", url: "https://drive.google.com/file/d/1E9BmsgTCviJGsazvx_q0D_qNng1k2Cop/preview" }, { title: "O corpo", url: "https://drive.google.com/file/d/1APURKFILNPvNGAT5Z18Zs2YtNdpnhwWL/preview" }, { title: "A pulga e o acrobata", url: "https://drive.google.com/file/d/1UIRAu43z4qHuTtWxPDvs03mq61OjWpJh/preview" }, { title: "O monstro", url: "https://drive.google.com/file/d/1QQQfaiAdD7inyyRgjWeAnzxKDtxaQmU6/preview" }, { title: "A banheira", url: "https://drive.google.com/file/d/1Nr7BB5TZMUN8FJQJk5Eu81Nz32Ijj9-M/preview" }, { title: "De ponta-cabeça", url: "https://drive.google.com/file/d/1lt6WZmAHr40_ofQ3YI0Ir0WqONMt3sxp/preview" } ],
            2: [ { title: "Mad Max", url: "https://drive.google.com/file/d/1vWObqz3txFCkAsmlF6rP0hnkLXQdYNTg/preview" }, { title: "Gostosura ou travessura", url: "https://drive.google.com/file/d/15LkiyN-XNsKTsKuIinx1lxGEJ6atqEB3/preview" }, { title: "O girino", url: "https://drive.google.com/file/d/1aOYmRWV7aAiuDm7F-L8d2nWPXsnK3u2N/preview" }, { title: "Will, o sábio", url: "https://drive.google.com/file/d/1EbN2px12MOdlv8t3bG1lzW8CHKX19S3f/preview" }, { title: "Dig Dug", url: "https://drive.google.com/file/d/15RS3bamEfRrHxtUgOPgrPbjWQnGCs9K3/preview" }, { title: "O espião", url: "https://drive.google.com/file/d/1eftQ6iiGIegch1OxNC8g_impKYvdvMsx/preview" }, { title: "A irmã perdida", url: "https://drive.google.com/file/d/14go4_qruYL5gVU5MWzwmeLzNR8rFGRrB/preview" }, { title: "O Devorador de Mentes", url: "https://drive.google.com/file/d/1hsJCe8ryMDaz5iHMxF5i9UvRGRJp51gc/preview" }, { title: "O portal", url: "https://drive.google.com/file/d/1KGNzD6d4sLvhpsT0xGGF9Z8gEesGtPFD/preview" } ],
            3: [ { title: "Está me ouvindo, Suzie?", url: "https://drive.google.com/file/d/1XfzDMa5UUXTEGYI7rRor16xMLqns21-S/preview" }, { title: "O caso dos ratos", url: "https://drive.google.com/file/d/1uDZAS0aOjS-bQipiFiGYG0X2zK1Bc3Jt/preview" }, { title: "A salva-vidas desaparecida", url: "https://drive.google.com/file/d/1VpRDqWLTi4QsU01GcNxJrwmKP5MS6Lo5/preview" }, { title: "A prova da sauna", url: "https://drive.google.com/file/d/1IVZ1hfGl8YIeTfGQO5Jp3DJd4jVQeDmj/preview" }, { title: "Os devorados", url: "https://drive.google.com/file/d/1SVXkvGOx2HMa8iS5WCRY8PuoQSA8J6YK/preview" }, { title: "E pluribus unum", url: "https://drive.google.com/file/d/1uam4RJCEYkFGtyinYJ8Ljo-JkHIpSLc1/preview" }, { title: "A mordida", url: "https://drive.google.com/file/d/1JiRmtEHXa83vleGIBTv-1yg_OCIYZaCW/preview" }, { title: "A batalha de Starcourt", url: "https://drive.google.com/file/d/1_F6_qA9MtI7SR9mr3C4CW-wen5i9yu6u/preview" } ],
            4: [ { title: "O Clube Hellfire", url: "https://drive.google.com/file/d/1ZDiFOud9zBnrsegnKCo1oEoW6iBbzCS2/preview" }, { title: "A maldição de Vecna", url: "https://drive.google.com/file/d/1BLh9YesJz1mWYZxFw-EjVM0BRulY305u/preview" }, { title: "O monstro e a super-heroína", url: "https://drive.google.com/file/d/17d7rivkMsdtf8l500URgQGdvMaggSS1k/preview" }, { title: "Querido Billy", url: "https://drive.google.com/file/d/1z_rVv032G7-UXqb45OCtNLpDkVG8ZKpq/preview" }, { title: "Projeto Nina", url: "https://drive.google.com/file/d/1OD2KvUHg_9xWMWkbAdh__w5Dau8JFUTS/preview" }, { title: "Mergulho", url: "https://drive.google.com/file/d/1WegNowrQi1EsSQZO7Uz_A3GowbBfH9FO/preview" }, { title: "O massacre no laboratório", url: "https://drive.google.com/file/d/1ipI0psTtKFSw6OcoQiXvFot2koGJW2W0/preview" }, { title: "Papai", url: "https://drive.google.com/file/d/16NS_DpktJW4a7M9aqflF9m7Iv3Z4z0LJ/preview" }, { title: "E o plano de Onze", url: "https://drive.google.com/file/d/1i_qekb-WZTIkkFlRM36FIjHKPjfTZ3Y6/preview" } ],
            5: [ { title: "Missão de resgate", url: "https://drive.google.com/file/d/1xFrwPesQ0zXWoRsBaL9ZIDTPnvVSkkuF/preview" }, { title: "O desaparecimento de Holly Wheeler", url: "https://drive.google.com/file/d/1f7j3ma94atswrsZVf9-uSiqPLNeixHrC/preview" }, { title: "A armadilha", url: "https://drive.google.com/file/d/1Um1zw_iXsah4kh3AzDBSOuMek6kbZxI2/preview" }, { title: "Feiticeiro", url: "https://drive.google.com/file/d/1_dBex9phSWyauWp1eoFoRx9AN9i31dPA/preview" }, { title: "Tratamento de choque", url: "https://drive.google.com/file/d/1wvZIvfHngKO8b7yurLrDsPIzX3ijLZHE/preview" }, { title: "A fuga de Camazotz", url: "https://drive.google.com/file/d/15J4JKrp2BVQQCdoQcHU_JnYHOzdNd3qJ/preview" }, { title: "A ponte", url: "https://drive.google.com/file/d/1OzFsVQtKLWbAiXQgF1iGiTzSGuuPRFX0/preview" }, { title: "O mundo direito", url: "https://drive.google.com/file/d/1XSlN4w9H4jsas08jGrMhthBHspHNm3QS/preview" } ]
        }
    },
    {
        id: 'divertida-mente-2',
        title: 'Divertida Mente 2',
        type: 'filme',
        category: 'Animação / Família',
        year: '2024',
        cover: 'https://cdn.oantagonista.com/uploads/2024/08/Divertida-Mente-2-entra-top-10-de-bilheterias-da-historia.jpg',
        description: 'Riley agora é uma adolescente e novas emoções chegam ao quartel-general: Ansiedade, Inveja, Tédio e Vergonha. A Alegria terá trabalho dobrado.',
        url: 'https://drive.google.com/file/d/1-qpXor4EgfGwNzxNmETa3PriyCwLH7SM/preview'
    },
    {
        id: 'heartstopper',
        title: 'Heartstopper',
        type: 'serie',
        category: 'Romance / Drama',
        year: '2022',
        cover: 'https://cinepop.com.br/wp-content/uploads/2022/04/AAAABc9YKEuRmNjwiTyK1lFICaN6OQN9MigeTk7JTOlvftA-9pz2hxqPQLPhxavB66sQeDCtP9NYVgmq1MRj8kkuli1WFVwU.jpg',
        description: 'Nesta história de amadurecimento, os adolescentes Charlie e Nick descobrem que sua amizade improvável pode ser algo a mais.',
        ratings: { imdb: 8.5, rottenTomatoes: 96, metascore: 82 },
        seasons: {
            1: [
                { title: "Encontro", url: "https://drive.google.com/file/d/1-XQTUcmZMrifBtswcMpUQ7QBQLvN5IyD/preview" },
                { title: "Crush", url: "https://drive.google.com/file/d/1-fGEdyrKidSQ6C0r8EHwUpPOQflHAggg/preview" },
                { title: "Beijo", url: "https://drive.google.com/file/d/1-lM9sujEr8bi1fHWkqgbnwyNkDBdZ-eL/preview" },
                { title: "Segredo", url: "https://drive.google.com/file/d/1-pxm8g27HfJXkoOIZCCL2CRDOe-rFTDy/preview" },
                { title: "Amizade", url: "https://drive.google.com/file/d/1-uj-i3VCEtTKIdkU6-VWgj34OipCWJ3i/preview" },
                { title: "Garotas", url: "https://drive.google.com/file/d/10CpJx8PQInleDzrJ2uBcCE9CqBLDw3PB/preview" },
                { title: "Bullying", url: "https://drive.google.com/file/d/106b-VrCsV2WGBN_-xOQn8Id2_GnPL0Ds/preview" },
                { title: "Namoro", url: "https://drive.google.com/file/d/100CmcZLLxrh2_FwFj1uR_RF1CP1r9EvC/preview" }
            ],
            2: [
                { title: "Revelação", url: "https://drive.google.com/file/d/1-aZ9bPvwzRsQ8DMXeSQBnVdAdvT8sLrx/preview" },
                { title: "Família", url: "https://drive.google.com/file/d/1-gQWx2K2BslWQTuie5ki0O0jbffsDjzt/preview" },
                { title: "Promessa", url: "https://drive.google.com/file/d/10AKli13FqeQ9hyH8bxJXDXncbPSgaGS1/preview" },
                { title: "Desafio", url: "https://drive.google.com/file/d/10B6kAjTiAmvIl1UhVgEaUa9R47IQkrDI/preview" },
                { title: "Calor", url: "https://drive.google.com/file/d/10BUmeEr9gJNoerUehzUbY756ogWNmC6s/preview" },
                { title: "Verdade ou consequência", url: "https://drive.google.com/file/d/10C-ukTNUr_gXzDf3GeV70yF0Oo5Iizo4/preview" },
                { title: "Desculpas e arrependimentos", url: "https://drive.google.com/file/d/10DxmTRS53SIwwFD7s0VZOgrljPmV8cFj/preview" },
                { title: "Perfeito", url: "https://drive.google.com/file/d/10XYkW1ohpvtS1oaRJAht_gQMyVjzPem7/preview" }
            ],
            3: [
                { title: "Amor", url: "https://watch.brplayer.cc/watch?v=NLE41OIK" },
                { title: "Casa", url: "https://watch.brplayer.cc/watch?v=P9JB65OT" },
                { title: "Conversa", url: "https://watch.brplayer.cc/watch?v=ZU71AT9C" },
                { title: "Jornada", url: "https://watch.brplayer.cc/watch?v=62RD59WG" },
                { title: "Inverno", url: "https://watch.brplayer.cc/watch?v=Y3N046BK" },
                { title: "Corpo", url: "https://watch.brplayer.cc/watch?v=UATYPSGH" },
                { title: "Juntos", url: "https://watch.brplayer.cc/watch?v=01Y92FWG" },
                { title: "Separados", url: "https://watch.brplayer.cc/watch?v=LM24A0Z3" }
            ]
        }
    },
    {
        id: 'luca',
        title: 'Luca',
        type: 'filme',
        category: 'Animação / Aventura',
        year: '2021',
        cover: 'https://thepausemenucouk.wordpress.com/wp-content/uploads/2021/06/luca-featured-image.jpg?w=1200',
        description: 'Na Riviera Italiana, uma amizade improvável, mas forte, cresce entre um ser humano e um monstro marinho disfarçado de humano.',
        url: 'https://drive.google.com/file/d/1k1zHNwZ91U1_-Hc0aYT8awp5U2t-cdcL/preview'
    },
    {
        id: 'soul',
        title: 'Soul',
        type: 'filme',
        category: 'Animação / Drama',
        year: '2020',
        cover: 'https://businessisjammin.ca/wp-content/uploads/2021/02/soul-poster-fi-e1573147724188.jpg',
        description: 'Joe Gardner é um professor de música que recebe a chance de tocar no melhor clube de jazz da cidade, mas um pequeno passo em falso o leva das ruas de Nova York para o Pré-Vida.',
        url: 'https://drive.google.com/file/d/1wixB2432TFKEhWy_N6b374VRHldoUX0b/preview'
    },
    {
        id: 'divertida-mente-1',
        title: 'Divertida Mente',
        type: 'filme',
        category: 'Animação / Família',
        year: '2015',
        cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/ca2b5ed3-e242-4a43-bc6a-2e02d024471b/compose?aspectRatio=1.78&format=webp&width=1200',
        description: 'Crescer pode ser uma estrada esburacada, e não é exceção para Riley, que é desarraigada de sua vida no Meio-Oeste quando seu pai começa um novo emprego em São Francisco.',
        url: 'https://drive.google.com/file/d/1-50I_wADQMMNwc27F8gIwbffkJiptNHS/preview'
    },
    {
        id: 'espiritos-na-escola',
        title: 'Espíritos na Escola',
        type: 'serie',
        category: 'Mistério / Sobrenatural',
        year: '2023',
        cover: 'https://pbs.twimg.com/media/FzKWtbPWABwDiL0.jpg',
        description: 'Maddie Nears, uma adolescente que morre misteriosamente e fica presa como fantasma em sua escola, junta-se a outros espíritos para investigar sua morte enquanto tenta se comunicar com os vivos.',
        ageRating: 'A16',
        seasons: {
            1: [
                { title: "Minha Pseudomorte", url: "https://drive.google.com/file/d/17MV5Yf_JovbVWonce8B9nBn9_KyX8hUB/view?usp=sharing" },
                { title: "Cicatrizes Antigas", url: "https://drive.google.com/file/d/1EgO1wNOGjxcfhXp04_crySmYCdsGf3r8/view?usp=drive_link" },
                { title: "Morta e Confusa", url: "https://drive.google.com/file/d/1DLLKr2NrQg1EyNJW_jLmdb7IlODTsfXl/view?usp=drive_link" },
                { title: "Intenções Mórbidas", url: "https://drive.google.com/file/d/1RmO4XgMwWBsdyJPIHCQaJFZapkNkGImI/view?usp=drive_link" },
                { title: "O Passado Entra em Campo", url: "https://drive.google.com/file/d/1tM1TKNFzLOkDL3--lazX_gWAlfvSb0GN/view?usp=drive_link" },
                { title: "Os Fantasmas se Divertem no Baile", url: "https://drive.google.com/file/d/1QMPXO26OfFQbHPljqZhFhOa5KmuqNE8W/view?usp=drive_link" },
                { title: "A Última Sessão Mediúnica", url: "https://drive.google.com/file/d/1HbZmKg_Sv0XBceEhB8X-SXM3bEmfKUUo/view?usp=drive_link" },
                { title: "O Corpo de Madison", url: "https://drive.google.com/file/d/14xsPGRaftntC8ewdjZc5i1z7LxW5kl3_/view?usp=drive_link" }
            ],
            2: [
                { title: "O Que Terá Acontecido a Maddie Nears?", url: "https://byseqekaho.com/e/hg93enf8ahyg/SSPRTS_2_1.mp4" },
                { title: "Campo dos Gritos", url: "https://byseqekaho.com/e/rcu67qzjqvdw/SSPRTS_2_2.mp4" },
                { title: "Mal Posso Assombrar", url: "https://byseqekaho.com/e/dn31klu9jyd5/SSPRTS_2_3.mp4" },
                { title: "Uma Troca de Corpos Para Recordar", url: "https://byseqekaho.com/e/xhd71esnwwcw/SPRTSNSCL_2_4.mp4" },
                { title: "Adivinhe Quem Vem Para Assombrar", url: "https://byseqekaho.com/e/rfuckrs4iurr/ESPRTSNESCL_2_5.mp4" },
                { title: "Assombração em Conflito", url: "https://byseqekaho.com/e/p8c97m81bw7h/SCHLSPRTS_2_6.mp4" },
                { title: "Anatomia de um Abrigo Nuclear", url: "https://byseqekaho.com/e/oq15fmrcvtkf/SCHLSPRTS_2_7.mp4" },
                { title: "Fogo, Fale Comigo", url: "https://byseqekaho.com/e/4rasekqi45hw/SCHLSPRT_2_8.mp4" }
            ]
        }
    },
    {
        id: 'spider-verse-pt',
        title: 'Homem-Aranha: Através do Aranhaverso',
        type: 'filme',
        category: 'Animação / Aventura',
        year: '2023',
        cover: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbSgv1dDgUpXTDNz6i2tus0qkwMdlkzEV_AdhUVxxIc4EVKTyy-cxtKoSF3O2LjPhoJchs55PbxsQx1Uninvc4_dMz8PmRru0Q6q.jpg?r=7ea',
        description: 'Miles Morales volta a viajar pelos multiversos para enfrentar novas ameaças e reencontrar aliados e versões alternativas do Homem-Aranha.',
        url: 'https://drive.google.com/file/d/1-dRGD7aePZvgGVXwP-9LjrNiJ6mRR3-8/view?usp=drive_link'
    },
    {
        id: 'topgun-maverick',
        title: 'Top Gun - Maverick',
        type: 'filme',
        category: 'Ação / Drama',
        year: '2022',
        cover: 'https://s2-techtudo.glbimg.com/Azg3GDuzrDvDPWFGXUU_HFwDl48=/0x0:1712x1054/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/v/d/igpA1vTVC6qIq8FdAcIA/topgun.jpg',
        description: 'Pete "Maverick" Mitchell volta à ativa para treinar uma nova geração de pilotos numa perigosa missão que exige sacrifício e coragem.',
        url: 'https://drive.google.com/file/d/1aI9DwujVad_E6otgWlg8hYrQdTUch_Kw/view?usp=drive_link'
    },
    {
        id: 'spiderman-far-from-home-pt',
        title: 'Homem-Aranha: Longe de Casa',
        type: 'filme',
        category: 'Ação / Aventura',
        year: '2019',
        cover: 'https://s2-techtudo.glbimg.com/6ixSt7jyxXN9ci-oLYls8wbcKk0=/0x0:1080x652/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/w/K/fuKxsITtGc8hv1htCkPw/20190628-spiderman001.webp',
        description: 'Peter Parker viaja pela Europa com amigos, mas logo enfrenta perigos quando novas ameaças interdimensionais aparecem.',
        url: 'https://drive.google.com/file/d/1W2r4WnajcJR3Vwbz1q2yzwmCgt3WANlu/view?usp=sharing'
    },
    {
        id: 'outer-banks',
        title: 'Outer Banks',
        type: 'serie',
        category: 'Aventura / Mistério',
        year: '2020',
        cover: 'https://m.media-amazon.com/images/I/71AGTqm7ARL.jpg',
        description: 'John B e os Pogues enfrentam mistérios, tesouros e perigos enquanto buscam pistas sobre o pai desaparecido.',
        seasons: {
            1: [
                { title: "Piloto – John B e os Pogues encontram pistas sobre o desaparecimento do pai.", url: "https://www.tokyvideo.com/br/embed/592667" },
                { title: "Bússola da Sorte – Uma bússola misteriosa leva a um grande segredo.", url: "https://www.tokyvideo.com/br/embed/640555" },
                { title: "Zona Proibida – Um mapa aponta para um navio cheio de ouro.", url: "https://www.tokyvideo.com/br/embed/640559" },
                { title: "Espiões – A história de Denmark Tanny vem à tona.", url: "https://www.tokyvideo.com/br/embed/640560" },
                { title: "Festa de Verão – Festa, romance e violência se misturam.", url: "https://www.tokyvideo.com/br/embed/640561" },
                { title: "Parcela 9 – Os Pogues descobrem o ouro escondido.", url: "https://www.tokyvideo.com/br/embed/640581" },
                { title: "Calmaria – Ward revela seu lado sombrio.", url: "https://www.tokyvideo.com/br/embed/640583" },
                { title: "A Pista de Pouso – O ouro é roubado e tudo desmorona.", url: "https://www.tokyvideo.com/br/embed/640584" },
                { title: "O Campanário – John B vira fugitivo da justiça.", url: "https://www.tokyvideo.com/br/embed/640586" },
                { title: "Phantom – John B e Sarah desaparecem no mar.", url: "https://www.tokyvideo.com/br/embed/640591" }
            ],
            2: [
                { title: "O Ouro – John B e Sarah tentam recuperar o tesouro.", url: "" },
                { title: "O Roubo – Um plano arriscado contra Ward.", url: "" },
                { title: "As Orações – Sarah luta pela vida; alianças mudam.", url: "" },
                { title: "A Volta – O passado de Denmark Tanny ressurge.", url: "" },
                { title: "A Pior Hora – John B quase é morto na prisão.", url: "" },
                { title: "A Escolha – Ward “morre” e segredos vêm à tona.", url: "" },
                { title: "A Fogueira – A Cruz de Santo Domingo entra no jogo.", url: "" },
                { title: "A Cruz – O tesouro da família de Pope é revelado.", url: "" },
                { title: "O Cais – Os Pogues perdem tudo outra vez.", url: "" },
                { title: "O Navio – Eles ficam presos em uma ilha deserta.", url: "" }
            ],
            3: [
                { title: "Poguelândia – Os Pogues sobrevivem isolados; Kiara é sequestrada.", url: "https://drive.google.com/file/d/1SkChMiR3ZCEh25UAWcTx_ID6Mln1y-8s/view?usp=drive_link" },
                { title: "Os Sinos – John B segue pistas sobre seu pai.", url: "https://drive.google.com/file/d/1pP0otEwgtqdsyoWzYqg5PRqtUbzCW9_8/view?usp=drive_link" },
                { title: "Pais e Filhos – O reencontro com Big John.", url: "https://drive.google.com/file/d/1HYjK7Wz9YoCOvWyuMEpkOuCutsDE-Vi7/view?usp=drive_link" },
                { title: "O Diário – A obsessão pelo tesouro divide o grupo.", url: "https://drive.google.com/file/d/1iMbw7SJ4VY7wGyy-T0SrYjALKAC58_I7/view?usp=drive_link" },
                { title: "Assaltos – A cruz é perdida definitivamente.", url: "https://drive.google.com/file/d/1pUsI0QD72dCIJ25pR8UczXPxflgdDJxg/view?usp=drive_link" },
                { title: "A Floresta Escura – Big John cai nas mãos de Singh.", url: "https://drive.google.com/file/d/1I8Mn-uwlM6w2Zg0rVoPdHU_mzn-qR_j8/view?usp=drive_link" },
                { title: "Feliz Aniversário – Traições quebram relações.", url: "https://drive.google.com/file/d/1Rzf5Ru76Cjgy5ad7i5nC4vGPF6phoReI/view?usp=drive_link" },
                { title: "Tocando o Leme – A casa de John B é incendiada.", url: "https://drive.google.com/file/d/1-fXKnwXPPTtlpY9MH62GSr7cAw0cCVog/view?usp=drive_link" },
                { title: "Bem-vindo a Kitty Hawk – Kiara é levada à força.", url: "https://drive.google.com/file/d/1Qs3g-PEmmsazhkMMvkj2vXmU1HJNKZOA/view?usp=drive_link" },
                { title: "Segredo do Gnomon – El Dorado é encontrado, mas a um alto custo.", url: "https://drive.google.com/file/d/17jm0GMa3ZhbyB3Ch-88rOyHoRllmSRXk/view?usp=drive_link" }
            ],
            4: [
                { title: "O Enduro – Os Pogues tentam investir no futuro, mas uma aposta arriscada muda tudo.", url: "https://drive.google.com/file/d/14rYUl651ki8T6qGHANWvH1RVLjKjngdq/view?usp=drive_link" },
                { title: "Barba Negra – Uma lenda amaldiçoada leva os Pogues a uma nova busca perigosa.", url: "https://drive.google.com/file/d/1579vsYslRkCcTq8ZVYrtBGnBR3NLD_3t/view?usp=drive_link" },
                { title: "Corsários – Segredos, interrogatórios e um artefato misterioso entram em jogo.", url: "https://drive.google.com/file/d/15GY-JX1LFn5kdkKz62BKUFG02qBbNvDy/view?usp=drive_link" },
                { title: "O Swell – Tensões aumentam durante o maior swell do ano.", url: "https://drive.google.com/file/d/15KB80PTeWz4jSTC63O_lWRUmGrmQ5Fdh/view?usp=drive_link" },
                { title: "Albatross – Uma carta misteriosa aponta o caminho para Charleston.", url: "https://drive.google.com/file/d/15dUHqKkug0nEm1Aj9JHiBU1zBvdgaa9B/view?usp=drive_link" },
                { title: "Prefeitura – Revelações do passado e alianças colocam tudo em risco.", url: "https://drive.google.com/file/d/1wzgw58XehxytfaBfsMABc5k0LQcz8Vr9/view?usp=drive_link" },
                { title: "Mães e Pais – Conflitos familiares e suspeitas perigosas vêm à tona.", url: "https://drive.google.com/file/d/1xBcaBKd19faed8Uy_VBg_xPpvhwPZKjN/view?usp=drive_link" },
                { title: "Trama Familiar – Decisões difíceis, segredos expostos e escolhas sem volta.", url: "https://drive.google.com/file/d/1xCo1znXCOnj9582hvXgZnHx5XCF6oALz/view?usp=drive_link" },
                { title: "Tempestade – Fugindo da polícia, os Pogues recebem ajuda inesperada.", url: "https://drive.google.com/file/d/1xEBpYR4Oz7dk1QKVWdxefN6tP9LtXkTE/view?usp=drive_link" },
                { title: "A Coroa Azul – Uma corrida final mortal decide o destino de todos.", url: "https://drive.google.com/file/d/1xFkzMpiCMpYPbRCiKVEsf5eLukrKMRyG/view?usp=drive_link" }
            ]
        }
    },
    {
        id: 'south-park-panderverso',
        title: 'South Park: Entrando no Panderverso',
        type: 'filme',
        category: 'Animação / Comédia',
        year: '2023',
        cover: 'https://m.media-amazon.com/images/S/pv-target-images/a8d4b023bc418eaf7583a9336843c8c0b341d4ceec6d341e3308a293ad8baadf._SX1080_FMjpg_.jpg',
        description: 'Uma aventura alucinante quando a turma de South Park é lançada por acidente em múltiplos universos paralelos.',
        url: 'https://www.tokyvideo.com/br/embed/639806'
    },
    {
        id: 'it-bem-vindos-a-derry',
        title: 'IT: Bem-Vindos a Derry',
        type: 'serie',
        category: 'Horror / Suspense',
        year: '2025',
        cover: 'https://rollingstone.com.br/wp-content/uploads/2025/10/Que-horas-estreia-It-Bem-Vindos-a-Derry-serie-preludio-de-It-A-Coisa.jpg',
        description: 'A chegada de novos moradores a Derry coincide com acontecimentos estranhos que revelam que algo antigo e maligno voltou a despertar.',
        seasons: {
            1: [
                { title: 'O Piloto', url: 'https://embedplay.icu/player.php?id=5fd00c3d' },
                { title: 'A Coisa na Escuridão', url: 'https://embedplay.icu/player.php?id=210503df' },
                { title: 'Agora Você O Vê', url: 'https://embedplay.icu/player.php?id=ef5487b6' },
                { title: 'O Grande Aparato Giratório do Funcionamento do Nosso Planeta', url: 'https://embedplay.icu/player.php?id=32082266' },
                { title: 'Rua Neibolt, 29', url: 'https://embedplay.icu/player.php?id=ea9d07aa' },
                { title: 'Em Nome do Pai', url: 'https://embedplay.icu/player.php?id=0508108d' },
                { title: 'O Black Spot', url: 'https://embedplay.icu/player.php?id=72b303b8' },
                { title: 'Brasas no Inverno', url: 'https://embedplay.icu/player.php?id=ce186551' }
            ]
        }
    },
    {
        id: 'demon-slayer-infinite-castle',
        title: 'Demon Slayer: Kimetsu no Yaiba – Castelo Infinito',
        type: 'filme',
        category: 'Animação / Ação',
        year: '2025',
        cover: 'https://images.justwatch.com/backdrop/333384494/s640/demon-slayer-kimetsu-no-yaiba-infinity-castle',
        description: 'Tanjiro e seus aliados enfrentam a ameaça dos Dez Lendários Lua para salvar Nezuko e acabar com o reinado de terror dos demônios.',
        url: 'https://drive.google.com/file/d/1NveQ-a7JXkArdeHdedqy_DPPYgF2S3en/view?usp=sharing'
    }
];

/* --- STATE --- */
let state = {
    currentPage: 'home',
    favorites: JSON.parse(localStorage.getItem('lumina_favorites')) || [],
    history: JSON.parse(localStorage.getItem('lumina_history')) || [],
    likes: JSON.parse(localStorage.getItem('lumina_likes')) || []
};

/* --- INIT --- */

/* Normalize various Google Drive URLs to reliable preview embeds */
function normalizeDriveUrl(url){
    if(!url) return url;
    try{
        const s = String(url).trim();
        // Try extract /d/FILE_ID patterns or id=FILE_ID query params
        const driveId = (s.match(/\/d\/([a-zA-Z0-9_-]{10,})/) || s.match(/id=([a-zA-Z0-9_-]{10,})/))?.[1];
        if(driveId){
            return `https://drive.google.com/file/d/${driveId}/preview`;
        }
        // handle open?id=...
        const openId = (s.match(/open\?id=([a-zA-Z0-9_-]{10,})/)||[])[1];
        if(openId) return `https://drive.google.com/file/d/${openId}/preview`;
        // fallback: return original string
        return s;
    }catch(e){
        return url;
    }
}
function disableContextMenu() {
    // Prevent desktop right-click context menu
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    // Lightweight touchstart listener to ensure mobile touch behavior remains smooth (no long-press menu)
    document.addEventListener('touchstart', () => {}, { passive: true });
}

function init() {
    disableContextMenu();
    renderHome();
    setupSearch();
    setupScrollHeader();
}

function setupScrollHeader() {
    window.addEventListener('scroll', () => {
        const header = document.getElementById('mainHeader');
        if (window.scrollY > 20) {
            header.classList.add('glass');
            header.classList.remove('py-5');
            header.classList.add('py-3');
        } else {
            header.classList.remove('glass');
            header.classList.add('py-5');
            header.classList.remove('py-3');
        }
    });
}

/* --- NAVIGATION --- */
function navigate(pageId) {
    ['page-home', 'page-search', 'page-mylist'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('page-active');
        el.classList.add('page-hidden');
    });

    const target = document.getElementById(`page-${pageId}`);
    target.classList.remove('page-hidden');
    setTimeout(() => target.classList.add('page-active'), 50);

    document.querySelectorAll('.nav-icon').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`nav-${pageId}`)?.classList.add('active');

    if (pageId === 'mylist') renderMyList();
    state.currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- RENDERING --- */
function renderHome() {
    // HERO
    const heroData = contentDB.find(i => i.isHero) || contentDB[0];
    const heroHtml = `
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-102" style="background-image: url('${heroData.cover}');"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#05000a] via-[#05000a]/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#05000a]/90 via-transparent to-transparent"></div>
        
        <div class="absolute inset-0 flex flex-col justify-end px-6 pb-8 z-10">
            <div class="flex items-center gap-2 mb-2 cascade-up delay-100">
                <span class="px-2 py-0.5 rounded-full bg-purple-600 text-[9px] font-bold uppercase tracking-widest text-white shadow-md">Novo</span>
                <span class="text-[11px] font-semibold text-white/80 drop-shadow-md border-l border-white/20 pl-3">${heroData.category}</span>
            </div>
            
            <h2 class="text-3xl md:text-4xl font-extrabold mb-3 text-white leading-tight cascade-up delay-200" style="text-shadow: 0 6px 18px rgba(0,0,0,0.6);">${heroData.title}</h2>
            
            <div class="flex gap-3 mt-2 cascade-up delay-300">
                <button onclick="openDetail('${heroData.id}')" class="btn-liquid flex-1 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base group">
                    <div class="w-7 h-7 rounded-full bg-white text-purple-600 flex items-center justify-center transition-transform">
                        <i class="fa-solid fa-play text-[10px]"></i>
                    </div>
                    Assistir
                </button>
                <button onclick="toggleFavorite('${heroData.id}')" class="w-12 h-12 rounded-xl glass flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10 hover:border-purple-500/40">
                    <i class="${state.favorites.includes(heroData.id) ? 'fa-solid text-purple-400' : 'fa-regular'} fa-bookmark text-lg"></i>
                </button>
            </div>
        </div>
    `;
    document.getElementById('hero-container').innerHTML = heroHtml;

    // LISTS
    // Series: Vertical Posters
    renderList('series-list', contentDB.filter(i => i.type === 'serie'), 'vertical');
    
    // Movies: Horizontal (Wide) Cards for variety
    renderList('movies-list', contentDB.filter(i => i.type === 'filme'), 'horizontal');
    
    updateContinueWatching();
}

function renderList(containerId, data, style = 'default') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Cinematic large cards for movies and series to improve visual consistency
    if (containerId === 'movies-list' || containerId === 'series-list' || style === 'cinematic' || style === 'horizontal') {
        container.innerHTML = data.map(item => {
            return `
                <div onclick="openDetail('${item.id}')" class="card-container snap-item w-96 md:w-104 flex-shrink-0 cursor-pointer group">
                    <div class="card-image-wrap rounded-2xl mb-3 bg-white/5 overflow-hidden relative" style="height:170px;">
                        <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>

                        <div class="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
                            <div>
                                <div class="text-sm font-bold text-white leading-tight">${item.title}</div>
                                <div class="text-[12px] text-white/60 mt-1">${item.category || ''} • ${item.year || ''}</div>
                            </div>

                            <div class="flex items-center gap-3">
                                <button onclick="event.stopPropagation(); playMedia('${item.id}', '', 0)" class="w-12 h-12 rounded-full btn-liquid flex items-center justify-center shadow-lg border border-white/10">
                                    <i class="fa-solid fa-play text-white text-sm"></i>
                                </button>
                                <button onclick="event.stopPropagation(); toggleFavorite('${item.id}')" class="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/8">
                                    <i class="${state.favorites.includes(item.id) ? 'fa-solid text-purple-400' : 'fa-regular text-white/90'} fa-bookmark"></i>
                                </button>
                            </div>
                        </div>

                        <div class="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/6 text-[12px] font-semibold text-white">${(item.category || '').split('/')[0] || ''}</div>
                    </div>

                    <div class="px-1">
                        <p class="text-sm font-semibold truncate text-white/90 group-hover:text-purple-300 transition-colors">${item.title}</p>
                        <p class="text-[11px] text-white/40 truncate">${(item.description || '').slice(0, 80)}${(item.description || '').length > 80 ? '…' : ''}</p>
                    </div>
                </div>
            `;
        }).join('');
        return;
    }

    // Fallback: compact cards (used for series/search/others)
    container.innerHTML = data.map(item => {
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 overflow-hidden relative">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year}</div>
                </div>
                <div class="px-1">
                    <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category}</p>
                </div>
            </div>
        `;
    }).join('');
}

function updateContinueWatching() {
    const section = document.getElementById('continue-section');
    const list = document.getElementById('continue-list');
    
    if (state.history.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    // Use the same card layout as other lists for visual consistency — show last episode title and duration
    list.innerHTML = state.history.slice(0, 6).map((hist, idx) => {
        const item = contentDB.find(i => i.id === hist.id);
        if (!item) return '';
        const lastEp = hist.lastEpisodeTitle ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${hist.lastEpisodeTitle}</div>` : '';
        const duration = hist.duration ? `<span class="text-[11px] text-white/40">${hist.duration}</span>` : '';
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year}</div>
                    <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                </div>
                <div class="px-1">
                    <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category}</p>
                    ${lastEp}
                </div>
            </div>
        `;
    }).join('');
}

/* --- FEATURES --- */
function toggleLike(id) {
    const btn = event.currentTarget.querySelector('i');
    if (state.likes.includes(id)) {
        state.likes = state.likes.filter(item => item !== id);
        btn.classList.replace('fa-solid', 'fa-regular');
        btn.classList.remove('text-red-500');
    } else {
        state.likes.push(id);
        btn.classList.replace('fa-regular', 'fa-solid');
        btn.classList.add('text-red-500', 'pop-heart');
        setTimeout(() => btn.classList.remove('pop-heart'), 400);
    }
    localStorage.setItem('lumina_likes', JSON.stringify(state.likes));
}

function shareContent(id, ev) {
    try { ev && ev.stopPropagation(); } catch(e){}

    const item = contentDB.find(i => i.id === id);
    if (!item) return;

    // Build a direct deep-link that opens the app and can be handled to play the title
    // using ?play=<id> so the receiver can open the exact item
    const deepLink = `${location.origin}${location.pathname}?play=${encodeURIComponent(id)}`;
    const shareTitle = item.title;
    const shareText = item.description ? item.description.slice(0, 120) : `Assista ${item.title}`;
    const sharePayloadText = `${shareTitle} — ${shareText}\n\nAbrir: ${deepLink}`;

    // Prefer Web Share API when available
    if (navigator.share) {
        navigator.share({
            title: shareTitle,
            text: shareText,
            url: deepLink
        }).catch(err => {
            console.warn('Native share failed', err);
            // fallback to clipboard copy
            navigator.clipboard?.writeText(sharePayloadText).catch(()=>{});
        });
        return;
    }

    // Fallback: copy to clipboard and show visual feedback
    navigator.clipboard?.writeText(sharePayloadText).then(() => {
        const btn = ev?.currentTarget || ev?.target || null;
        if (btn && btn.innerHTML) {
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check text-green-400 text-xl"></i><span class="text-[10px] text-green-400 ml-2">Copiado!</span>';
            setTimeout(() => btn.innerHTML = original, 1800);
        } else {
            const t = document.createElement('div');
            t.textContent = 'Link copiado para a área de transferência';
            t.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/6 text-white/90 px-4 py-2 rounded-xl text-sm';
            document.body.appendChild(t);
            setTimeout(()=> t.remove(), 1800);
        }
    }).catch(() => {
        // ultimate fallback
        prompt('Copie este link para partilhar:', deepLink);
    });
}

function toggleFavorite(id, refreshDetail = false) {
    const btn = event.currentTarget?.querySelector('i');
    const isFav = state.favorites.includes(id);

    if (isFav) {
        state.favorites = state.favorites.filter(fav => fav !== id);
        if(btn) {
            btn.classList.replace('fa-solid', 'fa-regular');
            btn.classList.remove('text-purple-400');
        }
    } else {
        state.favorites.push(id);
        if(btn) {
            btn.classList.replace('fa-regular', 'fa-solid');
            btn.classList.add('text-purple-400', 'pop-heart');
            setTimeout(() => btn.classList.remove('pop-heart'), 400);
        }
    }
    localStorage.setItem('lumina_favorites', JSON.stringify(state.favorites));
    
    if (state.currentPage === 'mylist') renderMyList();
}

function renderMyList() {
    const container = document.getElementById('favorites-grid');
    const empty = document.getElementById('empty-list');
    const countEl = document.getElementById('mylist-count');
    const favItems = contentDB.filter(i => state.favorites.includes(i.id));
    countEl.textContent = `${favItems.length} ${favItems.length === 1 ? 'item' : 'itens'}`;

    if (favItems.length === 0) {
        container.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');

    // Horizontal snap list: each card is wider (landscape) for a consistent horizontal feed — no rating dot on cards
    // Use the same cinematic wide card layout used on the home lists for consistency
    container.innerHTML = favItems.map((item, idx) => {
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-96 md:w-104 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap rounded-2xl mb-3 bg-white/5 overflow-hidden relative" style="height:170px;">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>

                    <div class="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
                        <div>
                            <div class="text-sm font-bold text-white leading-tight">${item.title}</div>
                            <div class="text-[12px] text-white/60 mt-1">${item.category || ''} • ${item.year || ''}</div>
                        </div>

                        <div class="flex items-center gap-3">
                            <button onclick="event.stopPropagation(); playMedia('${item.id}', '', 0)" class="w-12 h-12 rounded-full btn-liquid flex items-center justify-center shadow-lg border border-white/10">
                                <i class="fa-solid fa-play text-white text-sm"></i>
                            </button>
                            <button onclick="event.stopPropagation(); toggleFavorite('${item.id}')" class="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/8">
                                <i class="${state.favorites.includes(item.id) ? 'fa-solid text-purple-400' : 'fa-regular text-white/90'} fa-bookmark"></i>
                            </button>
                        </div>
                    </div>

                    <div class="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/6 text-[12px] font-semibold text-white">${(item.category || '').split('/')[0] || ''}</div>
                </div>

                <div class="px-1">
                    <p class="text-sm font-semibold truncate text-white/90 group-hover:text-purple-300 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.description || ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

/* --- DETAIL MODAL LOGIC (Animated) --- */
function openDetail(id) {
    const item = contentDB.find(i => i.id === id);
    const modal = document.getElementById('page-detail');
    const isLiked = state.likes.includes(id);
    const isFav = state.favorites.includes(id);

    // Create Season Select Logic
    let seasonsHtml = '';
    if (item.type === 'serie') {
        seasonsHtml = `
            <div class="mt-10 cascade-up delay-400">
                <div class="flex items-center justify-between mb-5 sticky top-0 py-3 z-10 bg-[#05000a]/95 backdrop-blur-md border-b border-white/5">
                    <h3 class="font-bold text-lg text-white">Episódios</h3>
                    <div class="relative">
                        <select id="seasonSelect" onchange="renderEpisodes('${item.id}', this.value)" 
                            class="appearance-none bg-white/5 border border-white/10 text-white py-2 pl-4 pr-10 rounded-xl text-sm font-bold focus:outline-none focus:border-purple-500 transition-colors cursor-pointer hover:bg-white/10">
                            ${Object.keys(item.seasons).map(s => `<option value="${s}">Temporada ${s}</option>`).join('')}
                        </select>
                        <i class="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 pointer-events-none"></i>
                    </div>
                </div>
                <div id="episodes-list" class="space-y-4 pb-safe"></div>
            </div>
        `;
    }

    // Build rating display: show star plus IMDb and RT next to it if available
    const ratingInfo = item.ratings
        ? `<span class="text-green-400 font-bold text-xs"><i class="fa-solid fa-star text-[10px]"></i> ${item.ratings.imdb || '—'}</span><span class="ml-2 text-[11px] text-white/60">• ${item.ratings.rottenTomatoes ? item.ratings.rottenTomatoes + '% RT' : '—'}</span>`
        : `<span class="text-green-400 font-bold text-xs"><i class="fa-solid fa-star text-[10px]"></i> —</span>`;

    modal.innerHTML = `
        <div class="relative w-full h-[60vh] md:h-[70vh]">
            <img src="${item.cover}" class="w-full h-full object-cover animate-modal-img">
            <div class="absolute inset-0 bg-gradient-to-t from-[#05000a] via-[#05000a]/40 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-[#05000a]/60 to-transparent"></div>
            <button onclick="closeDetail()" class="absolute top-6 left-6 w-12 h-12 rounded-full glass text-white flex items-center justify-center active:scale-90 transition-transform z-20 hover:bg-white/20 border border-white/10">
                <i class="fa-solid fa-arrow-left"></i>
            </button>
        </div>
        
        <div class="px-6 -mt-24 relative z-10 pb-10">
            <div class="animate-modal-enter">
                <div class="flex items-center gap-2 mb-3">
                    <span class="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold border border-white/10 uppercase tracking-wide text-white/80">${item.type}</span>
                    ${ratingInfo}
                </div>

                <h2 class="text-4xl font-black mb-6 text-white leading-tight drop-shadow-xl">${item.title}</h2>
                
                <button onclick="playMedia('${item.id}', '${item.type === 'serie' ? '1' : ''}', '0')" class="w-full btn-liquid text-white font-bold py-4 rounded-2xl mb-6 flex items-center justify-center gap-3 shadow-lg shadow-purple-900/40 active:scale-95 transition-transform text-lg">
                    <i class="fa-solid fa-play"></i> Assistir Agora
                </button>

                <p class="text-white/70 text-sm leading-relaxed mb-8 font-light tracking-wide">${item.description}</p>
                
                <div class="grid grid-cols-3 gap-2 py-4 border-t border-b border-white/5 bg-white/[0.02] rounded-2xl">
                    <button onclick="toggleFavorite('${item.id}', true)" class="flex flex-col items-center gap-2 group p-2">
                        <i class="${isFav ? 'fa-solid text-purple-400' : 'fa-regular text-white/50'} fa-bookmark text-2xl group-active:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-medium text-white/40 uppercase tracking-wider">Minha Lista</span>
                    </button>
                    <button onclick="toggleLike('${item.id}')" class="flex flex-col items-center gap-2 group p-2">
                        <i class="${isLiked ? 'fa-solid text-red-500' : 'fa-regular text-white/50'} fa-heart text-2xl group-active:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-medium text-white/40 uppercase tracking-wider">Gostei</span>
                    </button>
                    <button onclick="shareContent('${item.id}')" class="flex flex-col items-center gap-2 group p-2">
                        <i class="fa-solid fa-share-nodes text-2xl text-white/50 group-active:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-medium text-white/40 uppercase tracking-wider">Partilhar</span>
                    </button>
                </div>

                ${seasonsHtml}
            </div>
        </div>
    `;

    // show and animate modal
    modal.classList.remove('hidden');
    // ensure starting state for animation
    modal.classList.remove('animate-modal-enter');
    // trigger reflow then add animation class for consistent entrance
    void modal.offsetWidth;
    modal.classList.add('animate-modal-enter');
    if(item.type === 'serie') renderEpisodes(item.id, '1');
    document.body.style.overflow = 'hidden';
    // apply subtle image zoom animation if present
    const img = modal.querySelector('img');
    if (img) img.classList.add('animate-modal-img');
}

function renderEpisodes(itemId, seasonKey) {
    const item = contentDB.find(i => i.id === itemId);
    const episodes = item.seasons[seasonKey];
    const container = document.getElementById('episodes-list');
    
    container.innerHTML = episodes.map((ep, index) => `
        <div onclick="playMedia('${itemId}', '${seasonKey}', ${index})" class="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer group border border-transparent hover:border-white/5">
            <div class="w-32 aspect-video rounded-xl overflow-hidden relative bg-black/40 flex-shrink-0 shadow-lg">
                <img src="${item.cover}" class="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-opacity">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/10">
                        <i class="fa-solid fa-play text-white text-xs ml-0.5"></i>
                    </div>
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate mb-1">${index + 1}. ${ep.title}</h4>
                <p class="text-[11px] text-white/40 font-medium">42 min</p>
            </div>
            <div class="w-8 h-8 flex items-center justify-center text-white/20">
                <i class="fa-solid fa-download"></i>
            </div>
        </div>
    `).join('');
}

function closeDetail() {
    const modal = document.getElementById('page-detail');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

/* --- PLAYER LOGIC --- */
function playMedia(id, season, epIndex) {
    const item = contentDB.find(i => i.id === id);
    let url = '';
    let title = item.title;

    if (item.type === 'serie') {
        const ep = item.seasons[season][epIndex];
        url = ep.url;
        title = `${item.title}: ${ep.title}`;
    } else {
        url = item.url;
    }
    // Normalize Google Drive links to reliable preview embed URLs
    try { url = normalizeDriveUrl(url); } catch(e) { /* ignore */ }

    // Allow special-case series to bypass host checks (no blocks for 'espiritos-na-escola')
    const forceNoBlock = id === 'espiritos-na-escola';

    // Basic host-blocking (unsafe or shady hosts)
    try {
        const normalized = (url || '').toString().trim().toLowerCase();
        const blockedHosts = ['rkv1.com', 'click.alibaba.com', 'm1rs.com'];
        const isBlockedHost = blockedHosts.some(h => normalized.includes(h));

        if (!forceNoBlock && (isBlockedHost || !url)) {
            const playerOverlay = document.getElementById('page-player');
            const container = document.getElementById('player-container');
            const titleEl = document.getElementById('player-title');

            titleEl.textContent = title;
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center gap-4 p-6">
                    <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/6">
                        <i class="fa-solid fa-ban text-2xl text-white/60"></i>
                    </div>
                    <div class="text-center max-w-xs">
                        <h4 class="text-white font-bold">Conteúdo indisponível</h4>
                        <p class="text-white/60 text-sm mt-2">O vídeo não pode ser carregado aqui. Tente outro episódio ou verifique a fonte.</p>
                    </div>
                </div>
            `;
            playerOverlay.classList.remove('hidden');
            // animate player overlay in
            playerOverlay.classList.remove('fade-in');
            void playerOverlay.offsetWidth;
            playerOverlay.classList.add('fade-in');
            return;
        }
    } catch (err) {
        console.warn('Error validating media URL', err);
    }

    // If embed likely requires the host's own player (tokyvideo, embedplay, brplayer, etc.),
    // open the link directly in a new tab for immediate playback instead of sandboxed iframe.
    try {
        const extHosts = ['tokyvideo.com', 'embedplay.icu', 'brplayer.cc', 'watch.brplayer.cc'];
        const low = (url || '').toString().toLowerCase();
        // allow 'espiritos-na-escola' to load inline even if it matches extHosts
        if (!forceNoBlock && extHosts.some(h => low.includes(h))) {
            // Open externally and avoid creating the in-app iframe player
            window.open(url, '_blank');
            return;
        }
    } catch (e) { /* ignore */ }

    const playerOverlay = document.getElementById('page-player');
    const container = document.getElementById('player-container');
    const titleEl = document.getElementById('player-title');

    titleEl.textContent = title;
    container.innerHTML = `<div class="liquid-loader"></div>`; // Loading indicator
    // show + animate player overlay
    playerOverlay.classList.remove('hidden');
    playerOverlay.classList.remove('fade-in');
    void playerOverlay.offsetWidth;
    playerOverlay.classList.add('fade-in');

    // After a short delay, decide how to render the media:
    setTimeout(() => {
        const lowerUrl = (url || '').toString().toLowerCase();
        const isToky = lowerUrl.includes('tokyvideo.com');
        const isMp4 = lowerUrl.endsWith('.mp4') || lowerUrl.includes('.mp4?') || lowerUrl.includes('/mp4/');
        // For the special series, relax sandbox to improve embed compatibility
        const safeSandbox = forceNoBlock ? 'allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation' : 'allow-scripts allow-same-origin allow-forms';

        // Helper: build the player chrome with fullscreen button (moved to bottom-right)
        const buildFrameWrapper = (innerHtml) => {
            return `
                <div id="player-frame-wrapper" class="w-full h-full relative bg-black">
                    <div id="player-inner" class="w-full h-full">${innerHtml}</div>
                    <div class="absolute bottom-6 right-4 z-30 flex gap-2">
                        <button id="player-fullscreen-btn" class="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/10">
                            <i class="fa-solid fa-expand text-white"></i>
                        </button>
                    </div>
                </div>
            `;
        };

        if (isMp4) {
            // Use native <video> for mp4 links for better controls and performance
            const poster = item.cover || '';
            container.innerHTML = buildFrameWrapper(`
                <video id="native-video" class="w-full h-full bg-black" src="${url}" poster="${poster}" controls autoplay playsinline webkit-playsinline preload="metadata"></video>
            `);

            const videoEl = document.getElementById('native-video');
            // attempt to autoplay (muted fallback)
            videoEl.muted = false;
            videoEl.play().catch(() => { videoEl.muted = true; videoEl.play().catch(()=>{}); });

            // Hook fullscreen button
            document.getElementById('player-fullscreen-btn').onclick = () => {
                const wrapper = document.getElementById('player-frame-wrapper');
                if (wrapper.requestFullscreen) wrapper.requestFullscreen();
            };

            // Double-tap / double-click toggles play/pause
            videoEl.addEventListener('dblclick', () => {
                if (videoEl.paused) videoEl.play(); else videoEl.pause();
            });

            // Exit handling on ended: keep overlay visible but not playing
            videoEl.addEventListener('ended', () => {
                // small feedback: show replay icon briefly
            });
        } else {
            // Load as sandboxed iframe for embeds (tokyvideo and others). For the special case we relax sandbox for better compatibility.
            const iframeHtml = `<iframe src="${url}" class="w-full h-full border-none" sandbox="${safeSandbox}" referrerpolicy="no-referrer" allow="autoplay; fullscreen" allowfullscreen></iframe>`;

            container.innerHTML = buildFrameWrapper(iframeHtml);

            // Fullscreen button attempts to fullscreen the iframe wrapper
            document.getElementById('player-fullscreen-btn').onclick = () => {
                const wrapper = document.getElementById('player-frame-wrapper');
                if (wrapper.requestFullscreen) wrapper.requestFullscreen();
            };
        }

        // Keyboard: ESC closes player or exits fullscreen
        const escHandler = (ev) => {
            if (ev.key === 'Escape') {
                // if in fullscreen, exit fullscreen first
                if (document.fullscreenElement) {
                    document.exitFullscreen?.();
                } else {
                    closePlayer();
                }
            }
        };
        window.addEventListener('keydown', escHandler, { once: false });

        // Clean-up when overlay is closed: remove listener via mutation observer or override closePlayer to remove later.
        // We will store a reference on the overlay for cleanup.
        playerOverlay._escHandler = escHandler;

    }, 600);

    // compute a sensible duration label: try episode-level info else default
    let durationLabel = '—';
    try {
        if (item.type === 'serie') {
            const ep = item.seasons[season][epIndex];
            durationLabel = ep && ep.duration ? ep.duration : '42 min';
        } else {
            durationLabel = item.duration ? item.duration : '—';
        }
    } catch (e) {
        durationLabel = '—';
    }

    addToHistory(id, title, durationLabel, (item.type === 'serie' ? epIndex : null));
}

function closePlayer() {
    const playerOverlay = document.getElementById('page-player');
    // If fullscreen, try to exit it first
    if (document.fullscreenElement) {
        document.exitFullscreen?.();
    }

    // Remove/stop media playback safely
    const container = document.getElementById('player-container');

    try {
        // If native <video> exists, pause and fully unload it
        const videoEl = container.querySelector('video#native-video') || container.querySelector('video');
        if (videoEl) {
            try { videoEl.pause(); } catch(e){/* ignore */ }
            try { videoEl.removeAttribute('src'); } catch(e){/* ignore */ }
            try { videoEl.load(); } catch(e){/* ignore */ }
        }

        // If there's an iframe embed, navigate it to about:blank to stop any audio or scripts
        const iframe = container.querySelector('iframe');
        if (iframe) {
            try {
                // Try best-effort to stop playback by removing src and sandboxing
                iframe.src = 'about:blank';
                // also remove allow attribute to be extra safe
                iframe.removeAttribute('allow');
            } catch (e) { /* ignore */ }
        }

        // Additionally remove any <audio> elements if present
        const audioEl = container.querySelector('audio');
        if (audioEl) {
            try { audioEl.pause(); } catch(e){}
            try { audioEl.removeAttribute('src'); } catch(e){}
            try { audioEl.load(); } catch(e){}
        }
    } catch (err) {
        console.warn('Error while trying to stop media on close:', err);
    }

    // Finally clear the container HTML to free resources
    container.innerHTML = '';

    // Remove ESC handler if attached
    if (playerOverlay && playerOverlay._escHandler) {
        window.removeEventListener('keydown', playerOverlay._escHandler);
        delete playerOverlay._escHandler;
    }

    // remove animation class then hide after a short delay to allow CSS transitions to finish
    try {
        playerOverlay.classList.remove('fade-in');
        setTimeout(() => {
            playerOverlay.classList.add('hidden');
            updateContinueWatching();
        }, 260);
    } catch (e) {
        playerOverlay.classList.add('hidden');
        updateContinueWatching();
    }
}

function addToHistory(id, epTitle, duration = null, epIndex = null) {
    // keep unique per id, store last episode title, duration and index for better Continue Assistindo info
    state.history = state.history.filter(h => h.id !== id);
    const entry = {
        id,
        lastEpisodeTitle: epTitle || null,
        duration: duration || null,
        episodeIndex: (epIndex !== null ? epIndex : null),
        date: new Date().toISOString()
    };
    state.history.unshift(entry);
    if (state.history.length > 10) state.history.pop();
    localStorage.setItem('lumina_history', JSON.stringify(state.history));
}

function viewAll(type) {
    // Show search-like horizontal list for a specific type
    navigate('search');
    const results = contentDB.filter(i => i.type === type);
    const grid = document.getElementById('search-results');
    const titleEl = document.getElementById('search-title');
    const emptyEl = document.getElementById('search-empty');

    document.getElementById('searchInput').value = '';
    titleEl.textContent = type === 'serie' ? 'Séries' : 'Filmes';
    titleEl.classList.remove('hidden');

    if (results.length === 0) {
        grid.innerHTML = '';
        emptyEl.classList.remove('hidden');
        return;
    } else {
        emptyEl.classList.add('hidden');
    }

    // When viewAll is used to populate search results, render cinematic cards consistent with home
    grid.innerHTML = results.map((item, idx) => {
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-96 md:w-104 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap rounded-2xl mb-3 bg-white/5 overflow-hidden relative" style="height:170px;">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>

                    <div class="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
                        <div>
                            <div class="text-sm font-bold text-white leading-tight">${item.title}</div>
                            <div class="text-[12px] text-white/60 mt-1">${item.category || ''} • ${item.year || ''}</div>
                        </div>

                        <div class="flex items-center gap-3">
                            <button onclick="event.stopPropagation(); playMedia('${item.id}', '', 0)" class="w-12 h-12 rounded-full btn-liquid flex items-center justify-center shadow-lg border border-white/10">
                                <i class="fa-solid fa-play text-white text-sm"></i>
                            </button>
                            <button onclick="event.stopPropagation(); toggleFavorite('${item.id}')" class="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/8">
                                <i class="${state.favorites.includes(item.id) ? 'fa-solid text-purple-400' : 'fa-regular text-white/90'} fa-bookmark"></i>
                            </button>
                        </div>
                    </div>

                    <div class="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/6 text-[12px] font-semibold text-white">${(item.category || '').split('/')[0] || ''}</div>
                </div>

                <div class="px-1">
                    <p class="text-sm font-semibold truncate text-white/90 group-hover:text-purple-300 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.description || ''}</p>
                </div>
            </div>
        `;
    }).join('');
}

/* Render a recommendations horizontal list shown under the search when empty */
function renderRecommendations(limit = 8) {
    const recContainer = document.getElementById('recommendations-list');
    if (!recContainer) return;
    // Simple recommendation strategy: hero first, then top-rated, then recent movies
    const hero = contentDB.filter(i => i.isHero);
    const rated = contentDB.filter(i => i.ratings).sort((a,b) => (b.ratings.imdb||0) - (a.ratings.imdb||0));
    const recent = contentDB.slice().reverse().filter(i => i.type === 'filme');
    const combined = [...new Set([...hero, ...rated, ...recent, ...contentDB])].slice(0, limit);

    recContainer.innerHTML = combined.map((item, idx) => `
        <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
            <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 overflow-hidden relative">
                <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
                <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
            </div>
            <div class="px-1">
                <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
            </div>
        </div>
    `).join('');
}

function setupSearch() {
    const input = document.getElementById('searchInput');
    const grid = document.getElementById('search-results');
    const titleEl = document.getElementById('search-title');
    const emptyEl = document.getElementById('search-empty');

    // initial recommendations render
    renderRecommendations();

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        titleEl.classList.add('hidden');
        emptyEl.classList.add('hidden');

        if (query.length < 2) {
            // show recommendations when search is empty/short
            grid.innerHTML = '';
            titleEl.classList.add('hidden');
            emptyEl.classList.add('hidden');
            document.getElementById('recommendations-section')?.classList.remove('hidden');
            renderRecommendations();
            return;
        }

        // hide recommendations when actively searching
        document.getElementById('recommendations-section')?.classList.add('hidden');

        const results = contentDB.filter(i =>
            i.title.toLowerCase().includes(query) ||
            (i.category && i.category.toLowerCase().includes(query)) ||
            (i.description && i.description.toLowerCase().includes(query))
        );

        if (results.length === 0) {
            grid.innerHTML = '';
            emptyEl.classList.remove('hidden');
            return;
        }

        titleEl.classList.remove('hidden');

        // Render search results using the same cinematic card used on home for consistency
        grid.innerHTML = results.map((item, idx) => {
            const ratingHtml = item.ratings ? `<div class="mt-2 flex items-center gap-2">
                <span class="px-2 py-0.5 rounded bg-white/6 text-[11px] font-semibold">${item.ratings.imdb} IMDb</span>
                <span class="px-2 py-0.5 rounded bg-white/6 text-[11px] font-semibold">${item.ratings.rottenTomatoes}% RT</span>
            </div>` : '';
            return `
                <div onclick="openDetail('${item.id}')" class="card-container snap-item w-96 md:w-104 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                    <div class="card-image-wrap rounded-2xl mb-3 bg-white/5 overflow-hidden relative" style="height:170px;">
                        <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>

                        <div class="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3">
                            <div>
                                <div class="text-sm font-bold text-white leading-tight">${item.title}</div>
                                <div class="text-[12px] text-white/60 mt-1">${item.category || ''} • ${item.year || ''}</div>
                            </div>

                            <div class="flex items-center gap-3">
                                <button onclick="event.stopPropagation(); playMedia('${item.id}', '', 0)" class="w-12 h-12 rounded-full btn-liquid flex items-center justify-center shadow-lg border border-white/10">
                                    <i class="fa-solid fa-play text-white text-sm"></i>
                                </button>
                                <button onclick="event.stopPropagation(); toggleFavorite('${item.id}')" class="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/8">
                                    <i class="${state.favorites.includes(item.id) ? 'fa-solid text-purple-400' : 'fa-regular text-white/90'} fa-bookmark"></i>
                                </button>
                            </div>
                        </div>

                        <div class="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/6 text-[12px] font-semibold text-white">${(item.category || '').split('/')[0] || ''}</div>
                    </div>
                    <div class="px-1">
                        <p class="text-sm font-semibold truncate text-white/90 group-hover:text-purple-300 transition-colors">${item.title}</p>
                        <p class="text-[11px] text-white/40 truncate">${item.description || ''}</p>
                        ${ratingHtml}
                    </div>
                </div>
            `;
        }).join('');
    });
}

function clearFavorites() {
    state.favorites = [];
    localStorage.setItem('lumina_favorites', JSON.stringify(state.favorites));
    renderMyList();
}

// Smooth scroll helper for list arrows
function scrollList(containerId, dir = 1) {
    const el = document.getElementById(containerId);
    if (!el) return;
    // amount is roughly 80% of container width for a noticeable page-like scroll
    const amount = Math.round(el.clientWidth * 0.78) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
}

window.onload = init;
window.navigate = navigate;
window.openDetail = openDetail;
window.viewAll = viewAll;
window.toggleFavorite = toggleFavorite;
window.playMedia = playMedia;
window.closePlayer = closePlayer;
window.closeDetail = closeDetail;
window.clearFavorites = clearFavorites;
window.toggleLike = toggleLike;
window.shareContent = shareContent;
window.renderEpisodes = renderEpisodes;
window.scrollList = scrollList;
