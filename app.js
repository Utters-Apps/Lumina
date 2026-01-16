/* --- DATABASE --- */
const contentDB = [
    {
        id: 'diario-banana-1',
        title: 'Diário de um Banana',
        type: 'filme',
        category: 'Comédia / Família',
        year: '2010',
        duration: 94,
        ratings: { imdb: 6.3, rottenTomatoes: 54, audienceScore: 50 },
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
        cover: 'https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQUq_sj3y88nqrcBnRm69rS7xur65HYgLkCS5MxHbA-7Dvd72b3Mek4eoiDb5Rb4-dzpaJz260toRGHQIeKdtAvUxWmmk5hio-pquv_pTESDyz5XQuv6K0vlqFQvsPXGuMA0OfA7q27_8cBy9ds-8RroPX1Y.jpg?r=9d3',
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
        id: 'jujutsu-execucao',
        title: 'JUJUTSU KAISEN: Execução',
        type: 'filme',
        category: 'Animação / Ação',
        year: '2024',
        cover: 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/4261/876d18b9b32b961a5ca7f7afe7250834.jpg',
        description: 'Jujutsu Kaisen: Execução é um filme compilatório que resume o trágico Incidente em Shibuya, onde um véu aprisiona civis e o poderoso Satoru Gojo, levando Yuji Itadori e outros feiticeiros a uma batalha caótica contra maldições, resultando em um Japão dividido em colônias amaldiçoadas e iniciando o mortal Jogo do Abate (Culling Game), com Yuta Okkotsu encarregado de executar Yuji por seus crimes.',
        url: 'https://playerflixapi.com/filme/tt38121182'
    },
    {
        id: 'fnaf-nightmare',
        title: "Five Nights At Freddy's: O Pesadelo Sem Fim",
        type: 'filme',
        category: 'Terror / Suspense',
        year: '2023',
        cover: 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/1856/46d22a5f31d4977a391b2e1a8e9ebc21.jpg',
        description: 'Mike Schmidt, um segurança noturno problemático que aceita um emprego na abandonada Pizzaria Freddy Fazbear para cuidar de sua irmã mais nova, Abby.',
        url: 'https://playerflixapi.com/filme/tt4589218'
    },
    {
        id: 'fnaf-2',
        title: "Five Nights At Freddy's 2",
        type: 'filme',
        category: 'Terror / Suspense',
        year: '2025',
        cover: 'https://cinepop.com.br/wp-content/uploads/2025/12/fnaf-2-3.jpg',
        description: '‘Five Nights At Freddy’s 2‘, sequência do maior sucesso da história da Blumhouse, traz Mike, Abby e Vanessa tentando encontrar uma maneira de sobreviver por mais cinco noites quando um novo grupo de animatrônicos sai da pizzaria e causa o caos na cidade.',
        url: 'https://playerflixapi.com/filme/tt30274401'
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
                { title: "Minha Pseudomorte", url: "https://www.dropbox.com/scl/fi/htknkiialy93hzraetpcd/S_S_1_1_D.mp4?rlkey=ty47sz6y2ej2qravzldnx99wm&raw=1" },
                { title: "Cicatrizes Antigas", url: "https://www.dropbox.com/scl/fi/jav89oume4akjlk8qjwwg/S_S_1_2_D.mp4?rlkey=gljyx2b9iy91ykig9bwowx2os&raw=1" },
                { title: "Morta e Confusa", url: "https://www.dropbox.com/scl/fi/9cn2dfxkoqfcest7t1qs1/S_S_1_3_D.mp4?rlkey=p1vkpf7b6d84sughzwfmosoux&raw=1" },
                { title: "Intenções Mórbidas", url: "https://www.dropbox.com/scl/fi/gwjr3n3jp7y0i3bg7y1w2/S_S_1_4_D-1.mp4?rlkey=xkqye3296xnjc0y955z7eqedc&raw=1" },
                { title: "O Passado Entra em Campo", url: "https://www.dropbox.com/scl/fi/eajat75t4zeeq1usv7ifa/S_S_1_5_D.mp4?rlkey=dlaqabp1m3g9o2ankaa7okhsk&raw=1" },
                { title: "Os Fantasmas se Divertem no Baile", url: "https://www.dropbox.com/scl/fi/1uk571r9d12h0otsasdnp/S_S_1_6_D.mp4?rlkey=xp4z4l5dv4zj210ohyc53fj58&raw=1" },
                { title: "A Última Sessão Mediúnica", url: "https://www.dropbox.com/scl/fi/8h4lqdo5f1daf4zxc6yeh/S_S_1_7_D.mp4?rlkey=0bt8rn6wquag21y7iwpaj06r5&raw=1" },
                { title: "O Corpo de Madison", url: "https://www.dropbox.com/scl/fi/in5mqnt7qhr34tyxlo9zt/S_S_1_8_D.mp4?rlkey=q7nowznikoj38lnvad9g4jwbq&raw=1" }
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
    },
    {
        id: 'round-6',
        title: 'Round 6',
        type: 'serie',
        category: 'Drama / Suspense',
        year: '2021 - 2025',
        cover: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSlCq3x0mzdgFd1PeYqPTxTE1awDh5jYeAayIIjvZjLBHy971DLaTHBAzWwuYygqn_xscoiBxMtf1LncymZJzkqhYw3M-GBNupEZ.jpg?r=90b',
        description: 'Centenas de pessoas endividadas aceitam participar de jogos infantis com uma recompensa milionária. O que elas não sabem é que perder significa morrer. À medida que os jogos avançam, alianças, traições e dilemas morais revelam até onde o ser humano é capaz de ir para sobreviver.',
        ratings: { imdb: 8.0 },
        seasons: {
            1: [
                { title: "Batatinha Frita 1, 2, 3", url: "https://www.tokyvideo.com/br/embed/635210" },
                { title: "Inferno", url: "https://www.tokyvideo.com/br/embed/635240" },
                { title: "O Homem do Guarda-Chuva", url: "https://www.tokyvideo.com/br/embed/635259" },
                { title: "Fiquem Juntos", url: "https://www.tokyvideo.com/br/embed/635277" },
                { title: "Um Mundo Justo", url: "https://www.tokyvideo.com/br/embed/762428" },
                { title: "Gganbu", url: "https://www.tokyvideo.com/br/embed/638751" },
                { title: "VIPs", url: "https://www.tokyvideo.com/br/embed/762465" },
                { title: "O Líder", url: "https://www.tokyvideo.com/br/embed/635532" },
                { title: "Um Dia de Sorte", url: "https://www.tokyvideo.com/br/embed/635533" }
            ],
            2: [
                { title: "Pão e Loteria", url: "https://www.tokyvideo.com/br/embed/635551" },
                { title: "Festa de Halloween", url: "https://www.tokyvideo.com/br/embed/635549" },
                { title: "001", url: "https://www.tokyvideo.com/br/embed/635563" },
                { title: "Seis Pernas", url: "https://www.tokyvideo.com/br/embed/635559" },
                { title: "Mais um Jogo", url: "https://www.tokyvideo.com/br/embed/635565" },
                { title: "O X", url: "https://www.tokyvideo.com/br/embed/635569" },
                { title: "Amigos ou Inimigos?", url: "https://www.tokyvideo.com/br/embed/635572" }
            ],
            3: [
                { title: "Chaves e Facas", url: "https://www.tokyvideo.com/br/embed/756099" },
                { title: "Noite Estrelada", url: "https://www.tokyvideo.com/br/embed/756102" },
                { title: "Não é Culpa Sua", url: "https://www.tokyvideo.com/br/embed/756106" },
                { title: "222", url: "https://www.tokyvideo.com/br/embed/756109" },
                { title: "○△□", url: "https://www.tokyvideo.com/br/embed/756118" },
                { title: "Humanos", url: "https://www.tokyvideo.com/br/embed/756126" }
            ]
        }
    },
    {
        id: 'cassandra',
        title: 'Cassandra',
        type: 'serie',
        category: 'Suspense / Ficção Científica / Thriller',
        year: '2025',
        cover: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYegZ1f9bs8i9F0Iaf_HlCsnFMo4R8q4d9yq2prSTeuAyVyfRH4T-KVbGDmUQww_Ob9yEtTXdz5hAHq5foCnyVzYNc8H5JF0J94G.jpg?r=077',
        ageRating: 'A16',
        description: 'Uma família recomeça em uma casa inteligente dos anos 1970; ao reativar a assistente de IA chamada Cassandra, eles descobrem que a tecnologia fará de tudo para mantê-los ali.',
        seasons: {
            1: [
                { title: 'Recomeço', url: 'https://www.tokyvideo.com/br/embed/667082' },
                { title: 'Quem sou eu?', url: 'https://www.tokyvideo.com/br/embed/667076' },
                { title: 'Último jogo', url: 'https://www.tokyvideo.com/br/embed/667085' },
                { title: 'Brincadeira de criança', url: 'https://www.tokyvideo.com/br/embed/667086' },
                { title: 'Você não estará sozinho', url: 'https://www.tokyvideo.com/br/embed/667101' },
                { title: 'Feliz Natal', url: 'https://www.tokyvideo.com/br/embed/667105' }
            ]
        }
    },
    {
        id: 'wonka',
        title: 'Wonka',
        type: 'filme',
        category: 'Infantil / Fantasia',
        year: '2023',
        duration: '1h 56m',
        ageRating: '10',
        cover: 'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRHL8-ZgVngYcZCuSxG5TN3rFyCUMb5JwehnM9rKRA2QFo_pNPR0ZT6rL-oFRRNy2UnnQogXXrmHMYr0FcUuknHYubC-ytMHyEzH.jpg?r=63a',
        description: 'A origem do excêntrico chocolatier Willy Wonka e sua aventura até se tornar o mestre do chocolate.',
        url: 'https://drive.google.com/file/d/11vKocNGSRAFApBxQBHRy65Zk4rqZLGu5/view?usp=sharing'
    },
    {
        id: 'cuphead',
        title: 'Cuphead: A Série',
        type: 'serie',
        category: 'Animação / Comédia / Aventura / Infantil/Familiar',
        year: '2022',
        ageRating: 'TV-Y7',
        cover: 'https://i.ytimg.com/vi/vJBYsEim_yU/maxresdefault.jpg',
        description: 'Acompanhe as desventuras do impulsivo Cuphead e seu irmão cauteloso Mugman pelas surreais Ilhas Inkwell, enfrentando fantasmas, concursos e até o próprio Diabo com humor inspirado nos desenhos dos anos 1930.',
        seasons: {
            1: [
                { title: 'Carna-Mal', url: 'https://www.tokyvideo.com/br/embed/832860' },
                { title: 'Mamadeira', url: 'https://www.tokyvideo.com/br/embed/833203' },
                { title: 'Ribby e Croaks', url: 'https://www.tokyvideo.com/br/embed/834113' },
                { title: 'Cuidado: Frágil', url: 'https://www.tokyvideo.com/br/embed/834342' },
                { title: 'Jogando os Dados', url: 'https://www.tokyvideo.com/br/embed/834404' },
                { title: 'Fantasmas Não Existem', url: 'https://www.tokyvideo.com/br/embed/834697' },
                { title: 'Root Pack', url: 'https://www.tokyvideo.com/br/embed/834721' },
                { title: 'Melhor de Suéter', url: 'https://www.tokyvideo.com/br/embed/835062' },
                { title: 'Mais Suéter da Próxima Vez', url: 'https://www.tokyvideo.com/br/embed/836274' },
                { title: 'Caneco Perigoso', url: 'https://www.tokyvideo.com/br/embed/836622' },
                { title: 'Sono Profundo', url: 'https://www.tokyvideo.com/br/embed/837013' },
                { title: 'Em Perigo', url: 'https://www.tokyvideo.com/br/embed/837357' }
            ],
            2: [
                { title: 'Fuga da Prisão', url: 'https://www.tokyvideo.com/br/embed/838284' },
                { title: 'Encantados e Perigosos', url: 'https://www.tokyvideo.com/br/embed/838622' },
                { title: 'Uma Aventura em Alto-Mar', url: 'https://www.tokyvideo.com/br/embed/838659' },
                { title: 'Outro Irmão', url: 'https://www.tokyvideo.com/br/embed/838716' },
                { title: 'Doce Tentação', url: 'https://www.tokyvideo.com/br/embed/839084' },
                { title: 'O Cara do Sorvete', url: 'https://www.tokyvideo.com/br/embed/839620' },
                { title: 'Aula de Piano', url: 'https://www.tokyvideo.com/br/embed/840103' },
                { title: 'Libere os Demônios!', url: 'https://www.tokyvideo.com/br/embed/841185' },
                { title: 'Mortalmente Falidos', url: 'https://www.tokyvideo.com/br/embed/841436' },
                { title: 'Por Hoje é Só, Ratinho', url: 'https://www.tokyvideo.com/br/embed/841972' },
                { title: 'Diga Xis', url: 'https://www.tokyvideo.com/br/embed/842368' },
                { title: 'Perdidos na Floresta', url: 'https://www.tokyvideo.com/br/embed/842422' },
                { title: 'Tridente do Diabo', url: 'https://www.tokyvideo.com/br/embed/842701' }
            ],
            3: [
                { title: 'Achado Não é Roubado!', url: 'https://www.tokyvideo.com/br/embed/845210' },
                { title: 'Não Abram a Porta', url: 'https://www.tokyvideo.com/br/embed/845357' },
                { title: 'Ofuscado', url: '' },
                { title: 'Atropelamento', url: '' },
                { title: 'Árvore de Natal', url: '' },
                { title: 'Um Natal do Diabo', url: '' },
                { title: 'Entrega Especial', url: '' },
                { title: 'Dado', url: '' },
                { title: 'Passeio Divertido', url: '' },
                { title: 'Brincando com o Perigo', url: '' },
                { title: 'O Diabo e Senhorita Cálice', url: '' }
            ]
        }
    }
];

/* --- Ensure every item has an ageRating and add "The Amazing Digital Circus" series --- */
try {
    // Add new series: The Amazing Digital Circus (Portuguese title)
    contentDB.push({
        id: 'the-amazing-digital-circus',
        title: 'O Incrível Circo Digital',
        originalTitle: 'The Amazing Digital Circus',
        type: 'serie',
        category: 'Animação / Surreal',
        year: '2023 - 2026',
        ageRating: '12 anos',
        cover: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeSnycpEtbW-kf4BTjZdqNGjL39YFig-xRNfgSrG9Su1ayXXOhvMLgPsX3V6M-yQItQfqG1oqC-Shaq2_0Ll2OeOEGFaAiWw1OSP.jpg?r=988',
        description: 'O Incrível Circo Digital acompanha Pomni, uma mulher que, ao usar um headset de realidade virtual, fica presa dentro de um universo digital com temática de circo. Lá, ela e outros humanos são transformados em personagens caricatos e forçados a participar de aventuras e jogos orquestrados por Caine, uma inteligência artificial excêntrica. A série mistura humor sombrio, surrealismo e drama psicológico enquanto explora identidade, memórias perdidas e a relação conflituosa entre criador e criado.',
        seasons: {
            1: [
                { title: 'Piloto', duration: '25:14', url: 'https://www.youtube.com/embed/HwAPLk_sQ3w?si=Qh4qjTYd9fXuR2J1' },
                { title: 'Desespero no Desfiladeiro Doce!', duration: '24:43', url: 'https://www.youtube.com/embed/4ofJpOEXrZs?si=6sdcIIKquTv7S30t' },
                { title: 'O Mistério da Mansão Mildenhall', duration: '23:20', url: 'https://www.youtube.com/embed/bKjfw77cxeQ?si=K4_pNqRttkD4_0K-' },
                { title: 'Um Dia a Máscara Cai', duration: '25:33', url: 'https://www.youtube.com/embed/Q9KWcWKo2T8?si=CnANivklIwA_GZao' },
                { title: 'Sem Título', duration: '25:33', url: 'https://www.youtube.com/embed/mOvhHim78YA?si=YvnMgnKku-XI8_gE' },
                { title: 'Todos Ganham Armas', duration: '33:54', url: 'https://www.youtube.com/embed/mOvhHim78YA?si=Yclny9rQrD1CqEpz' },
                { title: 'Episódio de Praia', duration: '32:56', url: 'https://www.youtube.com/embed/oaOG1xOk7XY?si=MhRHzNYi5sa214Pb' }
            ]
        }
    });

    // Ensure every item has an ageRating property (default to 'Livre' if not present)
    contentDB.forEach(item => {
        if (!Object.prototype.hasOwnProperty.call(item, 'ageRating') || item.ageRating === undefined || item.ageRating === null || String(item.ageRating).trim() === '') {
            item.ageRating = 'Livre';
        }
    });
} catch (e) {
    console.warn('Error while adding default ageRating or new series:', e);
}

/* --- CATEGORY COLORS --- */
function getCategoryColor(category) {
    // Accepts a category string like "Animação / Família" and returns a color for the primary category.
    try {
        if (!category) return '#6b7280'; // neutral gray for unknown
        const primary = String(category).split('/')[0].trim().toLowerCase();
        const map = {
            'ação': '#ef4444',
            'ação ': '#ef4444',
            'animação': '#f59e0b',
            'aventura': '#06b6d4',
            'comédia': '#10b981',
            'drama': '#8b5cf6',
            'ficção científica': '#3b82f6',
            'sci-fi': '#3b82f6',
            'romance': '#ec4899',
            'terror': '#ef4444',
            'horror': '#ef4444',
            'suspense': '#f97316',
            'mistério': '#f97316',
            'familia': '#f59e0b',
            'família': '#f59e0b',
            'animação / família': '#f59e0b',
            'animação / aventura': '#06b6d4',
            'ação / aventura': '#ef4444',
            'ação / drama': '#ef4444',
            'romance / drama': '#ec4899',
            'animação / comédia': '#f59e0b',
            'thriller': '#f97316',
            'drama / suspense': '#8b5cf6',
            'mistério / sobrenatural': '#7c3aed'
        };
        // fallback heuristics: check keywords
        for (const key of Object.keys(map)) {
            if (primary.includes(key)) return map[key];
        }
        // check direct map by word
        const cleaned = primary.replace(/[^a-z0-9\s]/g, '');
        for (const k in map) {
            if (cleaned.includes(k)) return map[k];
        }
        // default accent
        return '#7c3aed';
    } catch (e) {
        return '#7c3aed';
    }
}

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

        // QUICK REJECT: if it already looks like a drive preview, return as-is
        if (s.includes('/preview') && s.includes('drive.google.com')) return s;

        // Try common Google Drive patterns into a canonical /file/d/ID/preview
        // 1) /file/d/FILE_ID/...
        let m = s.match(/\/file\/d\/([a-zA-Z0-9_-]{10,})/);
        if (m && m[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;

        // 2) /d/FILE_ID (sometimes shorter paths)
        m = s.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
        if (m && m[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;

        // 3) open?id=FILE_ID or uc?id=FILE_ID
        m = s.match(/[?&](?:id|export)=([a-zA-Z0-9_-]{10,})/);
        if (m && m[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;

        // 4) share links with drive.googleusercontent or alternate host that include an id param
        m = s.match(/\/d\/([a-zA-Z0-9_-]{10,})\/view/);
        if (m && m[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;

        // 5) fallback: sometimes a plain file id is passed - detect a lone id pattern
        m = s.match(/^([a-zA-Z0-9_-]{20,})$/);
        if (m && m[1]) return `https://drive.google.com/file/d/${m[1]}/preview`;

        // Otherwise return original string unchanged
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

/* Disable common mobile browser gestures to emulate an app experience:
   - prevent double-tap zoom, two-finger pinch zoom, and gesturestart events
   - prevent overscroll navigation where possible (back/forward)
   - add a small timestamp guard to block rapid double-tap
*/
function disableBrowserGestures() {
    // Best-effort: block large gesture events but remain friendly to browser optimizations.
    // Use passive:true when possible to avoid forcing main-thread blocking that can trigger jank or reloads.
    try {
        // Some browsers support gesture events (iOS Safari); wrap in try/catch to avoid errors.
        window.addEventListener('gesturestart', (e) => { try { e.preventDefault(); } catch(e){} }, { passive: true });
        window.addEventListener('gesturechange', (e) => { try { e.preventDefault(); } catch(e){} }, { passive: true });
        window.addEventListener('gestureend', (e) => { try { e.preventDefault(); } catch(e){} }, { passive: true });
    } catch (e) {}

    // Reduce aggressive touch blocking; only prevent multi-touch pinch and rapid double-tap via lightweight guards.
    let lastTouch = 0;
    window.addEventListener('touchend', (e) => {
        try {
            const now = Date.now();
            if (now - lastTouch <= 300) {
                // only prevent default for rapid double-tap sequences
                e.preventDefault();
            }
            lastTouch = now;
        } catch (err) {}
    }, { passive: false });

    // Prevent two-finger pinch (touchmove with more than one touch) from zooming — guard to avoid heavy processing
    window.addEventListener('touchmove', (e) => {
        try {
            if (e.touches && e.touches.length > 1) {
                e.preventDefault();
            }
        } catch (err) {}
    }, { passive: false });

    // Prevent overscroll navigation near edges but avoid heavy work — minimal guard
    const edgeThreshold = 18;
    window.addEventListener('touchstart', (e) => {
        try {
            if (!e.touches || e.touches.length === 0) return;
            const t = e.touches[0];
            if (t.clientX <= edgeThreshold || (window.innerWidth - t.clientX) <= edgeThreshold) {
                e.preventDefault();
            }
        } catch (err) {}
    }, { passive: false });
}

function init(deepPlayId = null) {
    disableContextMenu();
    // additional mobile gesture suppression to behave like a native app
    try { disableBrowserGestures(); } catch(e) {}
    renderHome();
    setupSearch();
    setupScrollHeader();

    // If a deep-play id was supplied (from URL), store it to auto-play after name prompt
    if (deepPlayId) {
        // store temporarily on window for usage after name prompt
        window.__lumina_deepplay = deepPlayId;
    }
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

    // Clamp vertical scrolling so user cannot scroll past the Top Rated section.
    // We listen to scroll, wheel and touchmove and programmatically restrict scrollTop.
    function getMaxScroll() {
        // Determine candidate target elements depending on current page so the same "stop at Top Rated"
        // behavior applies across Search, Home and My List (also consider Recommendations and favorites).
        const isSearchPage = (state && state.currentPage === 'search') || document.getElementById('page-search')?.classList.contains('page-active');
        const isMyList = (state && state.currentPage === 'mylist') || document.getElementById('page-mylist')?.classList.contains('page-active');

        // priority list of element ids to use as clamp target (first existing wins)
        const candidates = isSearchPage
            ? ['search-results', 'recommendations-list', 'recommended-list', 'toprated-list']
            : (isMyList
                ? ['favorites-grid', 'favorites-grid'] // favorites-grid is primary for My List
                : ['toprated-list', 'recommended-list', 'recommended-list', 'new-list']);

        // find the first candidate element that exists and has layout
        let targetEl = null;
        for (const id of candidates) {
            const el = document.getElementById(id);
            if (el) {
                // ensure it's rendered and has width/height so we don't clamp to an empty node
                const rectCheck = el.getBoundingClientRect();
                if (rectCheck.width > 0 && rectCheck.height > 0) {
                    targetEl = el;
                    break;
                } else {
                    // also accept when the element has children (lists often have zero height but contain items)
                    if (el.children && el.children.length > 0) {
                        targetEl = el;
                        break;
                    }
                }
            }
        }

        // fallback to body height (no clamp) if nothing suitable found
        if (!targetEl) return document.body.scrollHeight;

        // find the surrounding section wrapper (prefer the animate-slideUp wrapper, fallback to element)
        const section = targetEl.closest('div.animate-slideUp') || targetEl;
        const rect = section.getBoundingClientRect();
        // rect.bottom is relative to viewport; add current scroll to get document coordinate
        const bottomInDocument = window.scrollY + rect.bottom;
        // compute the maximum scrollTop so that the bottom of the target section aligns with the bottom of the viewport
        // small extra padding to avoid clipping controls
        const max = Math.floor(bottomInDocument - window.innerHeight + 8);
        return Math.max(0, max);
    }

    let maxScroll = getMaxScroll();
    // Recompute when layout changes (resize, content render)
    window.addEventListener('resize', () => { maxScroll = getMaxScroll(); });
    // Also refresh after a short delay when content updates (useful when lists render)
    const refreshMax = () => { setTimeout(() => { maxScroll = getMaxScroll(); }, 120); };
    // tie to some known events that re-render lists
    window.addEventListener('load', refreshMax);
    document.addEventListener('DOMContentLoaded', refreshMax);

    // On scroll, clamp the scroll position
    window.addEventListener('scroll', () => {
        const cur = window.scrollY || document.documentElement.scrollTop;
        maxScroll = getMaxScroll();
        if (cur > maxScroll) {
            window.scrollTo({ top: maxScroll, behavior: 'smooth' });
        }
    }, { passive: true });

    // Prevent wheel / touchmove from scrolling past the max directly
    window.addEventListener('wheel', (e) => {
        // if detail modal is open, don't apply global clamp (allow modal inner scroll)
        const detailModal = document.getElementById('page-detail');
        if (detailModal && !detailModal.classList.contains('hidden')) return;
        const cur = window.scrollY || document.documentElement.scrollTop;
        maxScroll = getMaxScroll();
        if (e.deltaY > 0 && cur >= maxScroll - 2) {
            e.preventDefault();
        }
    }, { passive: false });

    let touchStartY = null;
    window.addEventListener('touchstart', (e) => {
        // when modal detail is open we still want inner scrolling; just record start but skip clamp checks later
        const detailModal = document.getElementById('page-detail');
        touchStartY = e.touches ? e.touches[0].clientY : null;
        maxScroll = getMaxScroll();
        // mark whether global clamp should be active for this touch sequence
        window.__lumina_touchClampActive = !(detailModal && !detailModal.classList.contains('hidden'));
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (touchStartY === null) return;
        // if clamp isn't active for this touch (e.g. detail modal open), allow native behavior
        if (!window.__lumina_touchClampActive) return;
        const touchY = e.touches ? e.touches[0].clientY : null;
        if (touchY === null) return;
        const delta = touchStartY - touchY;
        const cur = window.scrollY || document.documentElement.scrollTop;
        maxScroll = getMaxScroll();
        // if moving downwards (trying to scroll further) and we're at or past max, block
        if (delta > 0 && cur >= maxScroll - 2) {
            e.preventDefault();
        }
    }, { passive: false });
}

/* --- NAVIGATION --- */
function navigate(pageId) {
    ['page-home', 'page-search', 'page-mylist'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('page-active');
        el.classList.add('page-hidden');
    });

    const target = document.getElementById(`page-${pageId}`);
    if (!target) {
        console.warn('navigate: target page not found:', pageId);
        return;
    }
    target.classList.remove('page-hidden');
    setTimeout(() => target.classList.add('page-active'), 50);

    document.querySelectorAll('.nav-icon').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`nav-${pageId}`)?.classList.add('active');

    if (pageId === 'mylist') renderMyList();
    state.currentPage = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* --- RENDERING --- */
/* deterministic daily shuffle helper: returns a new array shuffled deterministically by date */
function dailyShuffle(arr, salt = '') {
    // simple seeded shuffle using date as seed so results change each day
    const dateSeed = new Date().toISOString().slice(0,10) + '|' + salt; // YYYY-MM-DD
    // build numeric seed by summing char codes
    let seed = 0;
    for (let i = 0; i < dateSeed.length; i++) seed = (seed * 31 + dateSeed.charCodeAt(i)) >>> 0;
    // copy
    const out = arr.slice();
    // Fisher-Yates using seeded PRNG
    function rand() {
        seed = (seed ^ (seed << 13)) >>> 0;
        seed = (seed ^ (seed >>> 17)) >>> 0;
        seed = (seed ^ (seed << 5)) >>> 0;
        return (seed >>> 0) / 4294967295;
    }
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

function renderHome() {
    // HERO: build a small rotating carousel with up to 5 items.
    // Prefer explicit isHero flags, but augment with good candidates so the hero area isn't a single item.
    const heroCandidates = contentDB.filter(i => i.isHero);

    // If not enough explicit heroes, add other strong candidates:
    // priority: items with ratings (top-rated), then recent releases with covers, then any item with a cover.
    if (heroCandidates.length < 3) {
        const needed = 5 - heroCandidates.length;
        const already = new Set(heroCandidates.map(h => h.id));
        // top-rated by imdb
        const rated = contentDB.filter(i => i.ratings && i.ratings.imdb).sort((a,b) => (b.ratings.imdb||0) - (a.ratings.imdb||0));
        const recentWithCover = contentDB.slice().reverse().filter(i => i.cover);
        const fillers = [...rated, ...recentWithCover, ...contentDB].filter(i => !already.has(i.id) && i.cover);
        for (let i = 0; i < fillers.length && heroCandidates.length < 5; i++) {
            heroCandidates.push(fillers[i]);
            already.add(fillers[i].id);
        }
    }

    // final hero list: deterministic shuffle for day-to-day variation, limit to 5 items
    const heroList = dailyShuffle(heroCandidates.length ? heroCandidates : (contentDB.filter(i => i.cover).slice(0,5) || [contentDB[0]]), 'hero').slice(0,5);

    // cleanup any previous hero interval to avoid duplicates when re-rendering
    if (window.__lumina_heroInterval) {
        try { clearInterval(window.__lumina_heroInterval); } catch (e) {}
        window.__lumina_heroInterval = null;
    }

    // ensure index persisted across re-renders but clamp to list length (guard against empty lists)
    window.__lumina_heroIndex = (typeof window.__lumina_heroIndex === 'number' && window.__lumina_heroIndex >= 0) ? (window.__lumina_heroIndex % Math.max(1, heroList.length)) : 0;

    // helper to render a single hero item into the hero container
    function renderHero(heroData) {
        if (!heroData) return;
        // show last watched progress on hero if it matches history
        const lastWatchedPointer = (() => {
            try { return JSON.parse(localStorage.getItem('lumina_last_watched') || 'null'); } catch(e){ return null; }
        })();
        const lastForHero = lastWatchedPointer && lastWatchedPointer.id === heroData.id ? lastWatchedPointer : null;
        const progressPct = (lastForHero && lastForHero.position && lastForHero.duration) ? Math.max(0, Math.min(100, Math.round((lastForHero.position / Number(lastForHero.duration || 1)) * 100))) : (lastForHero && lastForHero.position && !lastForHero.duration ? 0 : null);

        const heroHtml = `
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-102" style="background-image: url('${heroData.cover}');"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#05000a] via-[#05000a]/40 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#05000a]/90 via-transparent to-transparent"></div>
            
            <div class="absolute inset-0 flex flex-col justify-end px-6 pb-8 z-10">
                <div class="flex items-center gap-2 mb-2 cascade-up delay-100">
                    <span class="px-2 py-0.5 rounded-full bg-purple-600 text-[9px] font-bold uppercase tracking-widest text-white shadow-md">Destaque</span>
                    <span class="text-[11px] font-semibold text-white/80 drop-shadow-md border-l border-white/20 pl-3">${heroData.category || ''}</span>
                </div>
                
                <h2 class="text-3xl md:text-4xl font-extrabold mb-3 text-white leading-tight cascade-up delay-200" style="text-shadow: 0 6px 18px rgba(0,0,0,0.6);">${heroData.title}</h2>
                
                <div class="flex gap-3 mt-2 cascade-up delay-300 w-full">
                    <button onclick="${lastForHero ? `playMedia('${heroData.id}','',0)` : `openDetail('${heroData.id}')`}" class="btn-liquid flex-1 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base group">
                        <div class="w-7 h-7 rounded-full bg-white text-purple-600 flex items-center justify-center transition-transform">
                            <i class="fa-solid ${lastForHero ? 'fa-rotate-right' : 'fa-play'} text-[10px]"></i>
                        </div>
                        ${lastForHero ? 'Continuar' : 'Assistir'} 
                    </button>
                    <button onclick="toggleFavorite('${heroData.id}')" class="w-12 h-12 rounded-xl glass flex items-center justify-center text-white active:scale-90 transition-transform border border-white/10 hover:border-purple-500/40">
                        <i class="${state.favorites.includes(heroData.id) ? 'fa-solid text-purple-400' : 'fa-regular'} fa-bookmark text-lg"></i>
                    </button>
                </div>

                ${progressPct !== null ? `
                    <div class="mt-4 w-full cascade-up delay-350">
                        <div class="w-full bg-white/6 rounded-full h-2 overflow-hidden">
                            <div style="width:${progressPct}%" class="h-2 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                        </div>
                        <div class="text-[12px] text-white/60 mt-2">Você parou em ${lastForHero.position ? `${lastForHero.position}s` : 'ponto anterior'}</div>
                    </div>
                ` : ''}
            </div>
        `;
        const heroContainer = document.getElementById('hero-container');
        if (heroContainer) heroContainer.innerHTML = heroHtml;
    }

    // initial render
    renderHero(heroList[window.__lumina_heroIndex]);

    // set interval to rotate hero every 10 seconds (only if more than one hero)
    if (heroList.length > 1) {
        window.__lumina_heroInterval = setInterval(() => {
            try {
                window.__lumina_heroIndex = (Number(window.__lumina_heroIndex) + 1) % heroList.length;
                renderHero(heroList[window.__lumina_heroIndex]);
            } catch (e) {
                console.warn('Hero carousel rotation error', e);
            }
        }, 10000);
    }

    // LISTS
    // We'll rotate/update lists by day so users see fresh ordering each day.
    // Prepare base sets
    const allSeries = contentDB.filter(i => i.type === 'serie');
    const allMovies = contentDB.filter(i => i.type === 'filme');

    // Deterministically shuffle per day with different salts per section
    const seriesForToday = dailyShuffle(allSeries, 'series').slice(0, 10);
    const moviesForToday = dailyShuffle(allMovies, 'movies').slice(0, 10);
    const recommendedForToday = dailyShuffle(contentDB, 'recommended').slice(0, 10);
    const newReleasesForToday = dailyShuffle(contentDB.slice().sort((a,b) => (parseInt(b.year || '0') || 0) - (parseInt(a.year || '0') || 0)), 'new').slice(0, 8);
    const topRatedForToday = (dailyShuffle(contentDB.filter(i => i.ratings).sort((a,b) => (b.ratings.imdb||0) - (a.ratings.imdb||0)), 'toprated').slice(0,8).length)
        ? dailyShuffle(contentDB.filter(i => i.ratings).sort((a,b) => (b.ratings.imdb||0) - (a.ratings.imdb||0)), 'toprated').slice(0,8)
        : dailyShuffle(contentDB, 'toprated').slice(0,8);

    // Render using same rendering helper for visual consistency
    renderList('series-list', seriesForToday, 'vertical');
    renderList('movies-list', moviesForToday, 'horizontal');
    renderList('recommended-list', recommendedForToday, 'horizontal');
    renderList('new-list', newReleasesForToday, 'horizontal');
    renderList('toprated-list', topRatedForToday, 'horizontal');

    updateContinueWatching();

    // ensure the scroll clamping max is recalculated after lists render
    setTimeout(() => {
        const ev = new Event('resize');
        window.dispatchEvent(ev);
    }, 180);
}

function renderList(containerId, data, style = 'default') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // highlight item if it matches last watched pointer
    let lastWatched = null;
    try { lastWatched = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null'); } catch(e){ lastWatched = null; }

    // detect small/mobile breakpoint and unify card appearance to match Continue Assistindo on mobile
    const isSmallScreen = window.innerWidth <= 520;

    // unified small/mobile card markup (same as continue-watching style)
    const mobileCardMarkup = (item, idx) => {
        const lastEp = lastWatched && lastWatched.id === item.id ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${lastWatched.lastEpisodeTitle || ''}</div>` : '';
        const duration = item.duration ? `<span class="text-[11px] text-white/40">${item.duration}</span>` : '';
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                    <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                </div>
                <div class="px-1">
                    <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                    ${lastEp}
                </div>
            </div>
        `;
    };

    // If on small/mobile, render every list using the continue-style card for consistency
    if (isSmallScreen) {
        container.innerHTML = data.map((item, idx) => mobileCardMarkup(item, idx)).join('');
        return;
    }

    // For larger screens: previous behavior (distinct cinematic / compact cards)
    const cinematicCardClass = 'w-96 md:w-104';
    const compactCardWidth = 'w-72';

    if (containerId === 'movies-list' || containerId === 'series-list' || style === 'cinematic' || style === 'horizontal') {
        container.innerHTML = data.map(item => {
            const isLast = lastWatched && lastWatched.id === item.id;
            const lastBadge = isLast ? `<div class="absolute top-3 right-3 px-2 py-1 rounded text-[12px] font-semibold bg-purple-600 text-white">Último</div>` : '';
            return `
                <div onclick="openDetail('${item.id}')" class="card-container snap-item ${cinematicCardClass} flex-shrink-0 cursor-pointer group">
                    <div class="card-image-wrap rounded-2xl mb-3 bg-white/5 overflow-hidden relative" style="height:170px;">
                        <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" decoding="async">
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

                        ${lastBadge}
                        <div class="absolute top-3 left-3 px-2 py-1 rounded-full text-[12px] font-semibold" style="background:${getCategoryColor(item.category)}; color: #fff;">${(item.category || '').split('/')[0] || ''}</div>
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

    // Fallback: compact cards for search/other sections on larger screens
    container.innerHTML = data.map(item => {
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item ${compactCardWidth} flex-shrink-0 cursor-pointer group">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 overflow-hidden relative">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async">
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

    // Build up-to-date history from localStorage/state and enrich with contentDB metadata
    const history = (state.history || []).slice(0, 12); // show up to 12 recent items
    if (history.length === 0) {
        // If empty, show a small "Suggestions to continue" row using recent or recommended items
        section.classList.remove('hidden');
        const suggestions = dailyShuffle(contentDB, 'continue-suggest').slice(0, 6);
        list.innerHTML = suggestions.map((item, idx) => {
            const duration = item.duration ? `<span class="text-[11px] text-white/40">${item.duration}</span>` : '';
            return `
                <div data-id="${item.id}" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                    <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                        <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                        <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                        <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                    </div>
                    <div class="px-1">
                        <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                        <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                        <div class="text-[11px] text-white/50 mt-1 truncate">Sugestão</div>
                    </div>
                </div>
            `;
        }).join('');

        // attach robust click handlers (delegated) so openDetail works reliably across environments
        try {
            list.querySelectorAll('.card-container').forEach(el => {
                el.addEventListener('click', () => {
                    const id = el.getAttribute('data-id');
                    if (id) openDetail(id);
                }, { passive: true });
            });
        } catch(e){}

        return;
    }

    // If we have history, render items with resume affordance and progress
    section.classList.remove('hidden');
    list.innerHTML = history.map((hist, idx) => {
        const item = contentDB.find(i => i.id === hist.id);
        if (!item) return '';
        // compute a progress percentage when duration and position exist, else fallback to presence of position
        let pct = null;
        if (hist.position !== undefined && hist.position !== null && hist.duration !== undefined && hist.duration !== null) {
            const d = Number(hist.duration) || 0;
            if (d > 0) pct = Math.max(0, Math.min(100, Math.round((Number(hist.position) / d) * 100)));
        } else if (hist.position !== undefined && hist.position !== null) {
            // we know a position but not duration — show a subtle dot indicating "resumed"
            pct = 0;
        }

        const lastEp = hist.lastEpisodeTitle ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${hist.lastEpisodeTitle}</div>` : '';
        const duration = hist.duration ? `<span class="text-[11px] text-white/40">${hist.duration}</span>` : '';
        // compute resume params robustly
        const seasonKey = (hist.season || (item.seasons ? (item.seasons['1'] ? '1' : Object.keys(item.seasons)[0]) : '1'));
        const epIndexSafe = (hist.episodeIndex !== null && hist.episodeIndex !== undefined) ? hist.episodeIndex : 0;
        const progressBar = (pct !== null) ? `
            <div class="mt-2 w-full bg-white/6 rounded-full h-2 overflow-hidden">
                <div style="width:${pct}%" class="h-2 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </div>
        ` : '';

        return `
            <div data-id="${item.id}" data-season="${seasonKey}" data-ep-index="${epIndexSafe}" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                    <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>

                    <button data-resume class="absolute right-3 bottom-3 w-10 h-10 rounded-full btn-liquid flex items-center justify-center shadow-lg border border-white/10">
                        <i class="fa-solid fa-rotate-right text-white text-sm"></i>
                    </button>
                </div>

                <div class="px-1">
                    <p class="detail-link text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                    ${lastEp}
                    ${progressBar}
                </div>
            </div>
        `;
    }).join('');

    // Attach robust event listeners for cards and resume buttons so clicks always trigger the expected actions
    try {
        list.querySelectorAll('.card-container').forEach(el => {
            // card click now resumes playback directly (instead of opening detail)
            el.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const id = el.getAttribute('data-id');
                if (!id) return;
                const season = el.getAttribute('data-season') || '';
                const epIndex = Number(el.getAttribute('data-ep-index') || 0);

                const item = contentDB.find(i => i.id === id);
                if (!item) {
                    // fallback: open detail if item missing
                    openDetail(id);
                    return;
                }

                if (item.type === 'serie') {
                    playMedia(id, season, epIndex);
                } else {
                    playMedia(id, '', 0);
                }
            }, { passive: true });

            // resume button (explicit) will play media; find the resume button inside this card
            const resumeBtn = el.querySelector('[data-resume]');
            if (resumeBtn) {
                resumeBtn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    const id = el.getAttribute('data-id');
                    const season = el.getAttribute('data-season') || '';
                    const epIndex = Number(el.getAttribute('data-ep-index') || 0);
                    if (!id) return;
                    // decide play for series or movie
                    const item = contentDB.find(i => i.id === id);
                    if (!item) return;
                    if (item.type === 'serie') {
                        playMedia(id, season, epIndex);
                    } else {
                        playMedia(id, '', 0);
                    }
                }, { passive: true });
            }

            // also make title text open detail (in case event paths differ)
            const titleEl = el.querySelector('.detail-link');
            if (titleEl) {
                titleEl.addEventListener('click', (e) => { e.stopPropagation(); const id = el.getAttribute('data-id'); if (id) openDetail(id); }, { passive: true });
            }
        });
    } catch(e){}

    // ensure small-screen consistency: on mobile the lists already unify card styles in renderList,
    // but make sure Continue list arrows visibility is recalculated
    try {
        const wrap = document.querySelector('#continue-section .list-wrap');
        if (wrap) {
            const scrollable = document.getElementById('continue-list').scrollWidth > document.getElementById('continue-list').clientWidth;
            wrap.setAttribute('data-scrollable', scrollable ? 'true' : 'false');
        }
    } catch(e){}
}

/* --- FEATURES --- */
function toggleLike(id) {
    // Defensive: try to obtain button icon element from event path or fallback to querying DOM
    let btnIcon = null;
    try { btnIcon = event?.currentTarget?.querySelector?.('i') || null; } catch(e){}
    if (!btnIcon) {
        const candidate = document.querySelector(`[onclick*="toggleLike('${id}')"]`);
        if (candidate) btnIcon = candidate.querySelector('i');
    }

    if (state.likes.includes(id)) {
        state.likes = state.likes.filter(item => item !== id);
        if (btnIcon) {
            btnIcon.classList.replace('fa-solid', 'fa-regular');
            btnIcon.classList.remove('text-red-500', 'pop-like');
            btnIcon.style.filter = '';
        }
    } else {
        state.likes.push(id);
        if (btnIcon) {
            btnIcon.classList.replace('fa-regular', 'fa-solid');
            // stronger red + subtle glow and pop
            btnIcon.classList.add('text-red-500', 'pop-like');
            // ensure cleanup after animation
            setTimeout(() => { try { btnIcon.classList.remove('pop-like'); } catch(e){} }, 520);
        }
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
    // robustly locate icon element from event context or via querySelector fallback
    let btnIcon = null;
    try { btnIcon = event?.currentTarget?.querySelector?.('i') || null; } catch(e){}
    if (!btnIcon) {
        const candidate = document.querySelector(`[onclick*="toggleFavorite('${id}')"]`);
        if (candidate) btnIcon = candidate.querySelector('i');
    }

    const isFav = state.favorites.includes(id);
    if (isFav) {
        state.favorites = state.favorites.filter(fav => fav !== id);
        if (btnIcon) {
            btnIcon.classList.replace('fa-solid', 'fa-regular');
            btnIcon.classList.remove('text-yellow-400', 'pop-fav');
            btnIcon.style.filter = '';
        }
    } else {
        state.favorites.push(id);
        if (btnIcon) {
            btnIcon.classList.replace('fa-regular', 'fa-solid');
            // apply yellow style and favorite pop animation + glow
            btnIcon.classList.add('text-yellow-400', 'pop-fav');
            // cleanup after animation
            setTimeout(() => { try { btnIcon.classList.remove('pop-fav'); } catch(e){} }, 520);
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

    const isSmallScreen = window.innerWidth <= 520;

    const mobileCard = (item, idx) => {
        const lastWatched = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null');
        const lastEp = lastWatched && lastWatched.id === item.id ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${lastWatched.lastEpisodeTitle || ''}</div>` : '';
        const duration = item.duration ? `<span class="text-[11px] text-white/40">${item.duration}</span>` : '';
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                    <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                </div>
                <div class="px-1">
                    <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                    ${lastEp}
                </div>
            </div>
        `;
    };

    if (isSmallScreen) {
        container.innerHTML = favItems.map((item, idx) => mobileCard(item, idx)).join('');
    } else {
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
}

/* --- DETAIL MODAL LOGIC (Animated) --- */
function openDetail(id) {
    const item = contentDB.find(i => i.id === id);
    const modal = document.getElementById('page-detail');
    const isLiked = state.likes.includes(id);
    const isFav = state.favorites.includes(id);

    // Create Season Select Logic (improved pill segmented control)
    let seasonsHtml = '';
    if (item.type === 'serie') {
        const seasonKeys = Object.keys(item.seasons || {});
        const pills = seasonKeys.map((s, idx) => {
            return `<button class="season-pill ${idx === 0 ? 'active' : ''}" data-season="${s}" onclick="document.getElementById('seasonSelectHidden').value='${s}'; renderEpisodes('${item.id}','${s}'); toggleSeasonPills(this)">${s}</button>`;
        }).join('');
        seasonsHtml = `
            <div class="mt-10 cascade-up delay-400">
                <div class="flex flex-col gap-3 mb-4 sticky top-6 z-30">
                    <div class="flex items-center justify-between">
                        <h3 class="font-bold text-lg text-white">Episódios</h3>
                        <div class="text-sm text-white/50">Temporadas</div>
                    </div>

                    <div class="w-full overflow-x-auto no-scrollbar">
                        <div id="seasonPillsContainer" class="inline-flex gap-2 py-1 px-1">
                            ${pills}
                        </div>
                    </div>
                </div>

                <input type="hidden" id="seasonSelectHidden" value="${seasonKeys[0] || ''}" />
                <div id="episodes-list" class="space-y-4 pb-safe"></div>
            </div>

            <style>
                /* season pill styles */
                .season-pill {
                    appearance: none;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
                    color: #e6e6f0;
                    padding: 8px 12px;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    transition: transform 0.14s, background 0.16s, color 0.12s;
                }
                .season-pill.active {
                    background: linear-gradient(90deg,#7c3aed,#d946ef);
                    color: white;
                    box-shadow: 0 10px 30px rgba(140,80,220,0.16);
                    transform: translateY(-2px);
                }
                .season-pill:active { transform: scale(0.98); }
                /* hide native scrollbar for pills container */
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            </style>
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

    // ensure season pill sticky styles are available once modal is shown
    if (!document.getElementById('lumina-season-sticky-css')) {
        const style = document.createElement('style');
        style.id = 'lumina-season-sticky-css';
        style.textContent = `
            /* sticky pill elevated style when pinned to top */
            #seasonPillsContainer.pinned {
                position: sticky;
                top: 6px;
                z-index: 60;
                padding: 8px;
                border-radius: 12px;
                background: linear-gradient(90deg, rgba(12,8,28,0.88), rgba(20,12,36,0.78));
                box-shadow: 0 12px 28px rgba(0,0,0,0.6), 0 6px 18px rgba(124,58,237,0.08);
                border: 1px solid rgba(255,255,255,0.04);
                transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
                transform: translateY(0);
                backdrop-filter: blur(8px) saturate(120%);
            }
            /* slightly lift pills when pinned */
            #seasonPillsContainer.pinned .season-pill.active {
                transform: translateY(-3px);
                box-shadow: 0 8px 24px rgba(124,58,237,0.12);
            }
        `;
        document.head.appendChild(style);
    }
}

function renderEpisodes(itemId, seasonKey) {
    const item = contentDB.find(i => i.id === itemId);
    const episodes = (item.seasons && (item.seasons[String(seasonKey)] || item.seasons[seasonKey])) ? (item.seasons[String(seasonKey)] || item.seasons[seasonKey]) : [];
    const container = document.getElementById('episodes-list');
    if (!container) return;

    // Read last watched pointer to highlight episode
    let lastWatched = null;
    try { lastWatched = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null'); } catch(e){ lastWatched = null; }

    // Larger, richer episode card layout with improved "Marcar" button and data attributes
    container.innerHTML = episodes.map((ep, index) => {
        const duration = ep.duration ? ep.duration : (ep.len || '42 min');
        const epTitle = `${index + 1}. ${ep.title}`;
        const isLast = lastWatched && lastWatched.id === itemId && Number(lastWatched.episodeIndex) === Number(index);

        return `
            <div class="episode-row cascade-up" data-ep-index="${index}" data-season="${seasonKey}" data-item-id="${itemId}" style="animation-delay:${index * 36}ms">
                <div class="flex flex-col md:flex-row items-stretch gap-3 p-4 rounded-2xl bg-gradient-to-r from-black/25 to-black/12 hover:from-black/30 hover:to-black/20 transition-all cursor-pointer border border-transparent hover:border-white/6">
                    
                    <div class="w-full md:w-56 h-36 md:h-28 rounded-lg overflow-hidden relative flex-shrink-0 bg-black/20">
                        <img src="${ep.thumb || item.cover}" alt="${ep.title}" class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105">
                        ${isLast ? `<div class="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-yellow-400 text-black">Último</div>` : ''}
                        <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-black/70 text-white">${duration}</div>
                    </div>

                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between gap-3">
                                <h4 class="text-lg md:text-xl font-bold text-white truncate">${epTitle}</h4>
                                <span class="text-sm text-white/50">${(ep.airdate || ep.date) ? (ep.airdate || ep.date) : ''}</span>
                            </div>
                            <p class="text-sm text-white/60 mt-2 leading-relaxed line-clamp-3">${ep.summary || ep.description || item.description || ''}</p>
                        </div>

                        <div class="mt-3 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <button data-play class="flex items-center gap-2 py-2 px-3 rounded-lg btn-liquid text-sm font-bold">
                                    <i class="fa-solid fa-play"></i>
                                    Assistir
                                </button>

                                <button data-mark class="py-2 px-3 rounded-lg border border-white/6 text-white/80 hover:text-white transition-colors">
                                    <i class="fa-regular fa-square-check mr-2"></i><span class="mark-label">Marcar</span>
                                </button>
                            </div>

                            <div class="text-xs text-white/40">Ep. ${index + 1} • ${duration}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // update season pill active state (cosmetic)
    const pills = document.querySelectorAll('.season-pill');
    pills.forEach(p => p.classList.toggle('active', p.dataset && p.dataset.season === String(seasonKey)));

    // attach delegated handlers for the newly rendered episode rows
    try {
        // play buttons
        container.querySelectorAll('[data-play]').forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const row = btn.closest('.episode-row');
                if (!row) return;
                const idx = Number(row.dataset.epIndex || row.getAttribute('data-ep-index') || 0);
                const season = row.dataset.season;
                const id = row.dataset.itemId;
                playMedia(id, season, idx);
            }, { passive: true });
        });

        // mark buttons
        container.querySelectorAll('[data-mark]').forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const row = btn.closest('.episode-row');
                if (!row) return;
                const idx = Number(row.dataset.epIndex || row.getAttribute('data-ep-index') || 0);
                const season = row.dataset.season;
                const id = row.dataset.itemId;
                markEpisode(id, season, idx, btn);
            }, { passive: true });
        });
    } catch (e) {
        console.warn('renderEpisodes event binding error', e);
    }

    // ensure visual mark state is synchronized for episodes in this list
    updateEpisodeMarks(itemId, seasonKey);

    // setup a scroll listener to pin the season pills container when the episodes area scrolls up
    try {
        const modal = document.getElementById('page-detail');
        const pillsContainer = document.getElementById('seasonPillsContainer');
        if (modal && pillsContainer) {
            // compute threshold based on header height inside modal (keeps pills nicely under the top controls)
            const threshold = 84;
            const onScroll = () => {
                const rect = pillsContainer.getBoundingClientRect();
                // when the top of the pills is near or above the threshold, apply pinned visual state
                if (rect.top <= threshold) {
                    pillsContainer.classList.add('pinned');
                } else {
                    pillsContainer.classList.remove('pinned');
                }
            };
            // initial check and attach
            onScroll();
            modal.removeEventListener('scroll', onScroll);
            modal.addEventListener('scroll', onScroll, { passive: true });
            // also run on window resize to keep consistent
            window.addEventListener('resize', onScroll);
        }
    } catch (e) { /* silent */ }
}

/* Helper to toggle season pill UI (used by the inline onclick on the pills) */
function toggleSeasonPills(el) {
    try {
        const pills = document.querySelectorAll('.season-pill');
        pills.forEach(p => p.classList.remove('active'));
        if (el && el.classList) el.classList.add('active');
    } catch (e) {
        // Fail silently — UI toggle is cosmetic only
        console.warn('toggleSeasonPills error', e);
    }
}

/* --- Episode marking: store per-item/season/episode marks and update UI --- */
function _marksKey() { return 'lumina_marks_v1'; }

function markEpisode(itemId, seasonKey, epIndex, btnElem = null) {
    try {
        const raw = localStorage.getItem(_marksKey());
        const marks = raw ? JSON.parse(raw) : {};
        const key = `${itemId}::${seasonKey}::${epIndex}`;
        const isMarked = !!marks[key];
        if (isMarked) {
            delete marks[key];
        } else {
            marks[key] = { date: new Date().toISOString() };
        }
        localStorage.setItem(_marksKey(), JSON.stringify(marks));
        // update UI immediately
        updateEpisodeMarkButton(itemId, seasonKey, epIndex, btnElem);
    } catch (e) {
        console.warn('markEpisode error', e);
    }
}

function updateEpisodeMarkButton(itemId, seasonKey, epIndex, btnElem = null) {
    try {
        const raw = localStorage.getItem(_marksKey());
        const marks = raw ? JSON.parse(raw) : {};
        const key = `${itemId}::${seasonKey}::${epIndex}`;
        const isMarked = !!marks[key];

        // if a specific button element provided, update it, otherwise query for all matching buttons
        if (btnElem) {
            btnElem.classList.toggle('marked', isMarked);
            const icon = btnElem.querySelector('i');
            const label = btnElem.querySelector('.mark-label');
            if (icon) {
                icon.className = isMarked ? 'fa-solid fa-square-check mr-2' : 'fa-regular fa-square-check mr-2';
            }
            if (label) label.textContent = isMarked ? 'Marcado' : 'Marcar';
            return;
        }

        // find all rows and update matching one
        document.querySelectorAll(`.episode-row[data-item-id="${itemId}"][data-season="${seasonKey}"][data-ep-index="${epIndex}"]`).forEach(row => {
            const btn = row.querySelector('[data-mark]');
            if (!btn) return;
            btn.classList.toggle('marked', isMarked);
            const icon = btn.querySelector('i');
            const label = btn.querySelector('.mark-label');
            if (icon) {
                icon.className = isMarked ? 'fa-solid fa-square-check mr-2' : 'fa-regular fa-square-check mr-2';
            }
            if (label) label.textContent = isMarked ? 'Marcado' : 'Marcar';
        });
    } catch (e) {
        // silent
    }
}

function updateEpisodeMarks(itemId, seasonKey) {
    try {
        const raw = localStorage.getItem(_marksKey());
        const marks = raw ? JSON.parse(raw) : {};
        // iterate episodes in DOM for the given item/season and sync their mark state
        document.querySelectorAll(`.episode-row[data-item-id="${itemId}"][data-season="${seasonKey}"]`).forEach(row => {
            const idx = row.dataset.epIndex || row.getAttribute('data-ep-index');
            updateEpisodeMarkButton(itemId, seasonKey, idx);
        });
    } catch (e) { /* silent */ }
}

function closeDetail() {
    const modal = document.getElementById('page-detail');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

/* --- PLAYER LOGIC --- */
function playMedia(id, season, epIndex) {
    // Defensive checks to avoid TypeError when item / season / episode is missing
    const item = contentDB.find(i => i.id === id);
    if (!item) {
        console.warn(`playMedia: item with id "${id}" not found in contentDB`);
        const playerOverlay = document.getElementById('page-player');
        const container = document.getElementById('player-container');
        const titleEl = document.getElementById('player-title');
        titleEl.textContent = 'Conteúdo indisponível';
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center gap-4 p-6">
                <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center border border-white/6">
                    <i class="fa-solid fa-ban text-2xl text-white/60"></i>
                </div>
                <div class="text-center max-w-xs">
                    <h4 class="text-white font-bold">Conteúdo não encontrado</h4>
                    <p class="text-white/60 text-sm mt-2">Não foi possível localizar este título. Verifique se ele existe na biblioteca.</p>
                </div>
            </div>
        `;
        playerOverlay.classList.remove('hidden');
        playerOverlay.classList.remove('player-close');
        playerOverlay.classList.remove('player-open');
        void playerOverlay.offsetWidth;
        playerOverlay.classList.add('player-open');
        return;
    }

    // determine URL and title with safe fallbacks
    let url = '';
    let title = item.title || 'Sem título';

    if (item.type === 'serie') {
        // Validate season and episode safely
        const seasons = item.seasons || {};
        const seasonKey = (season && String(season) in seasons) ? String(season) : (Object.keys(seasons)[0] || null);
        if (!seasonKey) {
            console.warn(`playMedia: series "${id}" has no seasons`);
            url = '';
        } else {
            const eps = seasons[seasonKey] || [];
            const idx = (typeof epIndex === 'number' && epIndex >= 0 && epIndex < eps.length) ? epIndex : 0;
            const ep = eps[idx];
            if (!ep) {
                console.warn(`playMedia: episode not found for series "${id}", season "${seasonKey}", index ${idx}`);
                url = '';
            } else {
                url = ep.url || '';
                title = `${item.title}: ${ep.title || 'Episódio'}`;
                // normalize season/episode selection to the resolved ones
                season = seasonKey;
                epIndex = idx;
            }
        }
    } else {
        url = item.url || '';
    }

    // Normalize Google Drive links to reliable preview embed URLs
    try { url = normalizeDriveUrl(url); } catch(e) { /* ignore */ }

    // If no usable URL, show friendly "unavailable" player UI and exit
    if (!url) {
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
        // clear any closing/opening classes, then animate open
        playerOverlay.classList.remove('player-close');
        playerOverlay.classList.remove('player-open');
        void playerOverlay.offsetWidth;
        playerOverlay.classList.add('player-open');
        return;
    }

    // Basic host-blocking for clearly unsafe hosts (kept minimal)
    try {
        const normalized = (url || '').toString().trim().toLowerCase();
        const blockedHosts = []; // reserved for future rules
        const isBlockedHost = blockedHosts.some(h => normalized.includes(h));
        if (isBlockedHost) {
            console.warn('playMedia: blocked host for url', url);
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
                        <h4 class="text-white font-bold">Conteúdo bloqueado</h4>
                        <p class="text-white/60 text-sm mt-2">O host deste vídeo não é permitido neste player.</p>
                    </div>
                </div>
            `;
            playerOverlay.classList.remove('hidden');
            playerOverlay.classList.remove('player-close');
            playerOverlay.classList.remove('player-open');
            void playerOverlay.offsetWidth;
            playerOverlay.classList.add('player-open');

            // Mobile: try to lock orientation to landscape and update top overlay visibility depending on custom controls
            try {
                const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
                if (isMobile) lockToLandscape();
            } catch (e) {}

            // immediately set overlay visibility for mobile/non-custom players so mid-iframe taps won't surface top UI
            try { updateOverlayForMobile(playerOverlay, !!playerOverlay._hasCustomControls); } catch(e){}
            return;
        }
    } catch (err) {
        console.warn('Error validating media URL', err);
    }

    const playerOverlay = document.getElementById('page-player');
    const container = document.getElementById('player-container');
    const titleEl = document.getElementById('player-title');

    titleEl.textContent = title;
    container.innerHTML = `<div class="liquid-loader"></div>`; // Loading indicator
    playerOverlay.classList.remove('hidden');
    // ensure previous close class removed and start open animation
    playerOverlay.classList.remove('player-close');
    playerOverlay.classList.remove('player-open');
    void playerOverlay.offsetWidth;
    playerOverlay.classList.add('player-open');

    // record which item is currently playing so we can save playback position periodically
    window.__lumina_current_playing = { id, season: (item.type === 'serie' ? season : null), episodeIndex: (item.type === 'serie' ? epIndex : null), startedAt: new Date().toISOString() };

    setTimeout(() => {
        const lowerUrl = (url || '').toString().toLowerCase();
        const isMp4 = lowerUrl.endsWith('.mp4') || lowerUrl.includes('.mp4?') || lowerUrl.includes('/mp4/');

        const buildFrameWrapper = (innerHtml) => {
            return `
                <div id="player-frame-wrapper" class="w-full h-full relative bg-black">
                    <div id="player-inner" class="w-full h-full">${innerHtml}</div>
                </div>
            `;
        };

        // determine if embed host is Google Drive or other hosts
        let isDriveEmbed = false;
        let hostForUrl = '';
        try {
            const parsed = new URL(url, location.href);
            const host = (parsed.hostname || '').toLowerCase();
            hostForUrl = host;
            if (host.includes('drive.google.com') || host.includes('googleusercontent.com') || host.includes('docs.google.com')) {
                isDriveEmbed = true;
            }
        } catch (e) {
            // ignore parsing errors
        }

        // DEFAULT: do not force skip injection for Drive — treat Drive like a desktop embed even on mobile
        // only skip inject for specific known problematic hosts/ids
        let skipInject = false;
        try {
            const lowerHost = (hostForUrl || '').toLowerCase();
            if (lowerHost.includes('tokyvideo.com') || lowerHost.includes('tokyvideo')) skipInject = true;
            if (lowerHost.includes('brplayer') || lowerHost.includes('watch.brplayer')) skipInject = true;
            if (id === 'it-bem-vindos-a-derry') skipInject = true;
            if (id === 'heartstopper' && String(season) === '3') skipInject = true;
        } catch(e){}

        if (isMp4) {
            const poster = item.cover || '';
            const vjsId = 'vjs_player_' + Math.random().toString(36).slice(2,9);
            const videoTag = `
                <video id="${vjsId}" class="video-js vjs-big-play-centered w-full h-full" controls preload="metadata" poster="${poster}" playsinline webkit-playsinline>
                    <source src="${url}" type="video/mp4" />
                </video>
            `;
            container.innerHTML = buildFrameWrapper(videoTag);

            if (!document.getElementById('vjs-css')) {
                const link = document.createElement('link');
                link.id = 'vjs-css';
                link.rel = 'stylesheet';
                link.href = 'https://esm.sh/video.js@7.20.3/dist/video-js.css';
                document.head.appendChild(link);
                const style = document.createElement('style');
                style.id = 'vjs-theme';
                style.textContent = `
/* Minimal Lumina Video.js theme */
.video-js .vjs-control-bar { background: linear-gradient(90deg, rgba(124,58,237,0.18), rgba(217,70,239,0.12)); border-radius: 12px; padding: 6px; }
.video-js .vjs-big-play-button { background: linear-gradient(90deg,#7c3aed,#d946ef); border:none; box-shadow: 0 10px 30px rgba(140,80,220,0.18); }
.video-js .vjs-volume-panel, .video-js .vjs-progress-control { opacity: 0.98; }
.video-js.vjs-paused .vjs-big-play-button { transform: scale(1); }
.video-js.vjs-playing .vjs-big-play-button { transform: scale(0.92); opacity: 0.85; }
`;
                document.head.appendChild(style);
            }

            (async () => {
                try {
                    const module = await import('https://esm.sh/video.js@7.20.3');
                    const videojs = module?.default || module;
                    const vEl = document.getElementById(vjsId);
                    const player = videojs(vEl, {
                        controls: false,
                        autoplay: false,
                        preload: 'auto',
                        fluid: true,
                        controlBar: false
                    });
                    playerOverlay._vjsPlayer = player;

                    if (isMp4 && !isDriveEmbed) {
                        createPlayerControls(playerOverlay, true, () => player, { skipControls: false });
                    }

                    player.ready(() => {
                        player.play().catch(() => {
                            player.muted(true);
                            player.play().catch(()=>{});
                        });
                    });
                } catch (err) {
                    console.warn('Video.js load/init failed, falling back to native video element', err);
                    container.innerHTML = buildFrameWrapper(`
                        <video id="native-video" class="w-full h-full bg-black" src="${url}" poster="${poster}" autoplay playsinline webkit-playsinline preload="metadata"></video>
                    `);
                    const videoEl = document.getElementById('native-video');
                    if (isMp4 && !isDriveEmbed) {
                        createPlayerControls(playerOverlay, true, () => videoEl, { skipControls: false });
                    }
                    videoEl.play().catch(()=>{});
                }
            })();
        } else {
            let safeIframeAttr = 'allow="autoplay; fullscreen; encrypted-media; clipboard-write; picture-in-picture" allowfullscreen referrerpolicy="no-referrer" sandbox="allow-forms allow-scripts allow-presentation"';

            try {
                const parsed = new URL(url, location.href);
                const host = (parsed.hostname || '').toLowerCase();

                if (host.includes('tokyvideo.com')) {
                    safeIframeAttr = 'allow="autoplay; picture-in-picture" allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts"';
                } else if (host.includes('playerflixapi.com')) {
                    safeIframeAttr = 'allow="autoplay; fullscreen; encrypted-media; clipboard-write; picture-in-picture; web-share" allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups"';
                } else if (host.includes('drive.google.com') || host.includes('googleusercontent.com') || host.includes('docs.google.com')) {
                    safeIframeAttr = 'allow="autoplay; fullscreen; encrypted-media; clipboard-write; picture-in-picture; web-share" allowfullscreen referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-popups"';
                }
            } catch (e) {
                // keep default
            }

            // Special handling for YouTube links: use YouTube IFrame API and a custom overlayed play/pause button
            const isYouTube = (() => {
                try {
                    const parsed = new URL(url, location.href);
                    const host = (parsed.hostname || '').toLowerCase();
                    return host.includes('youtube.com') || host.includes('youtu.be');
                } catch (e) {
                    return String(url).includes('youtube') || String(url).includes('youtu.be');
                }
            })();

            if (isYouTube) {
                // extract embed-friendly video id or full embed url
                let ytEmbedSrc = url;
                try {
                    const parsed = new URL(url, location.href);
                    // handle common forms: /embed/ID, watch?v=ID, youtu.be/ID
                    if (parsed.hostname.includes('youtu.be')) {
                        const vid = parsed.pathname.slice(1);
                        ytEmbedSrc = `https://www.youtube.com/embed/${vid}?enablejsapi=1`;
                    } else if (parsed.searchParams && parsed.searchParams.get('v')) {
                        const vid = parsed.searchParams.get('v');
                        ytEmbedSrc = `https://www.youtube.com/embed/${vid}?enablejsapi=1`;
                    } else if (parsed.pathname.includes('/embed/')) {
                        // ensure enablejsapi
                        ytEmbedSrc = url.includes('enablejsapi=1') ? url : (url + (url.includes('?') ? '&enablejsapi=1' : '?enablejsapi=1'));
                    } else {
                        // fallback to ensuring enablejsapi present
                        ytEmbedSrc = url + (url.includes('?') ? '&enablejsapi=1' : '?enablejsapi=1');
                    }
                } catch (e) {
                    if (!ytEmbedSrc.includes('enablejsapi=1')) ytEmbedSrc = ytEmbedSrc + (ytEmbedSrc.includes('?') ? '&enablejsapi=1' : '?enablejsapi=1');
                }

                const iframeHtml = `
                    <div class="player-wrapper" style="position:relative;width:100%;height:100%;min-height:56vh;display:flex;align-items:center;justify-content:center;background:#000;">
                        <div id="lumina-yt-player" style="width:100%;height:100%;pointer-events:none;"></div>

                        <button id="lumina-yt-playpause" aria-label="Play/Pause" style="position:absolute;inset:0;margin:auto;width:80px;height:80px;border-radius:50%;font-size:30px;cursor:pointer;background:linear-gradient(90deg,#7c3aed,#d946ef);border:none;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(124,58,237,0.18);">
                            <i class="fa-solid fa-play" style="color:white;font-size:26px;"></i>
                        </button>
                        <div style="display:none" id="lumina-yt-iframe-src">${ytEmbedSrc}</div>
                    </div>
                    <style>
                        /* minimal pointer handling so clicks go to our play control only */
                        #lumina-yt-player iframe { width:100%; height:100%; border:0; display:block; }
                        /* ensure overlay button remains visible on small screens */
                        @media (max-width:420px) {
                            #lumina-yt-playpause { width:64px;height:64px;font-size:22px; }
                        }
                    </style>
                `;

                container.innerHTML = buildFrameWrapper(iframeHtml);

                // Load YT API once
                if (!window.__lumina_youtube_api_loading) {
                    window.__lumina_youtube_api_loading = true;
                    if (!window.YT) {
                        const tag = document.createElement('script');
                        tag.src = "https://www.youtube.com/iframe_api";
                        document.head.appendChild(tag);
                    }
                }

                // create or replace player after API is ready
                function createYTPlayer() {
                    try {
                        const srcDiv = document.getElementById('lumina-yt-iframe-src');
                        if (!srcDiv) return;
                        const src = srcDiv.textContent || srcDiv.innerText || '';
                        // remove any previous player container content
                        const wrap = document.getElementById('lumina-yt-player');
                        if (!wrap) return;

                        // Build an iframe element but with player parameters that disable native controls and keyboard
                        // We'll use the JS API (enablejsapi=1) but set playerVars to hide native UI so our custom controls take over.
                        // append required params safely
                        const sep = src.includes('?') ? '&' : '?';
                        let embedWithParams = src + sep + 'rel=0&modestbranding=1&playsinline=1&enablejsapi=1';
                        // Use the iframe src directly for the player creation; YT.Player will respect playerVars below too.
                        wrap.innerHTML = '';
                        const placeholder = document.createElement('div');
                        placeholder.id = 'lumina-yt-placeholder';
                        placeholder.style.width = '100%';
                        placeholder.style.height = '100%';
                        wrap.appendChild(placeholder);

                        // If a previous player exists, destroy it first
                        if (window.__luminaYTPlayerInstance) {
                            try { window.__luminaYTPlayerInstance.destroy(); } catch(e){}
                            window.__luminaYTPlayerInstance = null;
                        }

                        // Create player with minimal native controls (controls:0) and disabled keyboard
                        window.__luminaYTPlayerInstance = new YT.Player('lumina-yt-placeholder', {
                            height: '100%',
                            width: '100%',
                            host: 'https://www.youtube.com',
                            videoId: (function() {
                                try {
                                    const u = new URL(ytEmbedSrc, location.href);
                                    // parse embed path /embed/VIDEOID
                                    const m = u.pathname.match(/\/embed\/([^/?&]+)/);
                                    if (m && m[1]) return m[1];
                                    // fallback to query 'v'
                                    const q = u.searchParams.get('v');
                                    if (q) return q;
                                } catch(e){}
                                // last resort: return full src so player can decide
                                return '';
                            })(),
                            playerVars: {
                                controls: 0,
                                disablekb: 1,
                                modestbranding: 1,
                                rel: 0,
                                playsinline: 1,
                                iv_load_policy: 3,
                                showinfo: 0
                            },
                            events: {
                                onReady: (ev) => {
                                    // Keep iframe pointer-events disabled to avoid native clicks interfering;
                                    // our controls will drive playback via the YT API.
                                    try {
                                        const iframeEl = wrap.querySelector('iframe');
                                        if (iframeEl) iframeEl.style.pointerEvents = 'none';
                                    } catch (err) { /* ignore */ }

                                    // Attach our overlay play button to operate via YT API too
                                    const playBtn = document.getElementById('lumina-yt-playpause');
                                    const icon = playBtn.querySelector('i');
                                    playBtn.onclick = () => {
                                        const p = window.__luminaYTPlayerInstance;
                                        if (!p) return;
                                        const state = p.getPlayerState();
                                        if (state === YT.PlayerState.PLAYING || state === YT.PlayerState.BUFFERING) {
                                            p.pauseVideo();
                                            icon.className = 'fa-solid fa-play';
                                        } else {
                                            p.playVideo();
                                            icon.className = 'fa-solid fa-pause';
                                        }
                                    };

                                    // Create our unified custom controls (same controls used for mp4)
                                    // Provide a player facade that createPlayerControls can use.
                                    createPlayerControls(playerOverlay, true, () => {
                                        // return a facade object compatible with createPlayerControls expectations
                                        const p = window.__luminaYTPlayerInstance;
                                        if (!p) return null;
                                        return {
                                            // Video.js-like facade
                                            play: () => p.playVideo(),
                                            pause: () => p.pauseVideo(),
                                            paused: () => {
                                                const st = p.getPlayerState();
                                                return !(st === YT.PlayerState.PLAYING || st === YT.PlayerState.BUFFERING);
                                            },
                                            currentTime: (val) => {
                                                try {
                                                    if (typeof val === 'number') {
                                                        p.seekTo(Math.max(0, val), true);
                                                        return val;
                                                    } else {
                                                        // YT API returns seconds via getCurrentTime
                                                        return p.getCurrentTime();
                                                    }
                                                } catch (e) { return 0; }
                                            },
                                            duration: () => {
                                                try {
                                                    const d = p.getDuration();
                                                    return isNaN(d) ? 0 : d;
                                                } catch (e) { return 0; }
                                            },
                                            mute: (m) => {
                                                try { if (m) p.mute(); else p.unMute(); } catch(e){}
                                            }
                                        };
                                    }, { skipControls: false });

                                },
                                onStateChange: (ev) => {
                                    // keep overlay icon synced for quick visual feedback
                                    const playBtn = document.getElementById('lumina-yt-playpause');
                                    if (!playBtn) return;
                                    const icon = playBtn.querySelector('i');
                                    if (ev.data === YT.PlayerState.PLAYING) {
                                        icon.className = 'fa-solid fa-pause';
                                    } else if (ev.data === YT.PlayerState.ENDED) {
                                        icon.className = 'fa-solid fa-rotate-right';
                                    } else {
                                        icon.className = 'fa-solid fa-play';
                                    }
                                }
                            }
                        });
                    } catch (e) {
                        console.warn('createYTPlayer error', e);
                    }
                }

                // If YT API already loaded, create immediately, otherwise hook into onYouTubeIframeAPIReady
                if (window.YT && window.YT.Player) {
                    createYTPlayer();
                } else {
                    // attach/override global callback safely
                    const prev = window.onYouTubeIframeAPIReady;
                    window.onYouTubeIframeAPIReady = function() {
                        try { if (typeof prev === 'function') prev(); } catch(e){}
                        createYTPlayer();
                    };
                }

            } else {
                const iframeHtml = `
                    <div style="width:100%;height:100%;min-height:56vh;display:flex;align-items:center;justify-content:center;background:#000">
                        <iframe src="${url}" style="width:100%;height:100%;border:0;display:block;min-height:56vh;" ${safeIframeAttr}></iframe>
                    </div>
                `;
                container.innerHTML = buildFrameWrapper(iframeHtml);

                // If this is a Google Drive / googleusercontent embed, keep our custom overlay/controls active on mobile
                // and ensure taps on the embed surface reveal the top "REPRODUZINDO" overlay (back/close button).
                try {
                    const parsedHost = (new URL(url, location.href).hostname || '').toLowerCase();
                    const isDriveHost = parsedHost.includes('drive.google.com') || parsedHost.includes('googleusercontent.com') || parsedHost.includes('docs.google.com');
                    if (isDriveHost) {
                        // create our player controls (even if they can't control iframe internals, they provide the top overlay and consistent UX)
                        try {
                            createPlayerControls(playerOverlay, true, () => {
                                // iframe-based players don't expose a standard media API; return null so controls still render but gracefully no-op controls
                                return null;
                            }, { skipControls: false });
                        } catch (e) { /* ignore */ }

                        // ensure overlay is displayed and allowed to receive pointer events on interaction
                        updateOverlayForMobile(playerOverlay, true);

                        // ensure taps on the player container reveal the overlay (use capture to be robust)
                        const iframeEl = container.querySelector('iframe');
                        if (iframeEl) {
                            // reveal overlay when user taps the iframe area
                            const reveal = () => {
                                try {
                                    const topOverlay = document.querySelector('.player-overlay');
                                    if (topOverlay) {
                                        topOverlay.style.display = 'flex';
                                        topOverlay.style.pointerEvents = 'auto';
                                        topOverlay.style.opacity = '1';
                                    }
                                } catch (e) {}
                            };
                            // On some browsers clicking an iframe doesn't bubble; also attach to container as fallback
                            iframeEl.addEventListener('load', () => {
                                try {
                                    // attach a delegated click on the wrapper to reveal overlay
                                    const wrapper = document.getElementById('player-frame-wrapper') || container;
                                    wrapper.addEventListener('click', reveal, { passive: true });
                                } catch (e) {}
                            }, { passive: true });

                            // immediate attach fallback
                            try {
                                const wrapper = document.getElementById('player-frame-wrapper') || container;
                                wrapper.addEventListener('click', reveal, { passive: true });
                            } catch(e){}
                        }
                    }
                } catch (e) { /* silent */ }
            }
        }

        const escHandler = (ev) => {
            if (ev.key === 'Escape') {
                if (document.fullscreenElement) {
                    document.exitFullscreen?.();
                } else {
                    closePlayer();
                }
            }
        };
        window.addEventListener('keydown', escHandler, { once: false });
        playerOverlay._escHandler = escHandler;

    }, 400);

    // compute duration label
    let durationLabel = '—';
    try {
        if (item.type === 'serie') {
            const seasons = item.seasons || {};
            const seasonKey = season && seasons[season] ? season : Object.keys(seasons)[0];
            const ep = seasonKey && seasons[seasonKey] ? (seasons[seasonKey][epIndex] || null) : null;
            durationLabel = ep && ep.duration ? ep.duration : '42 min';
        } else {
            durationLabel = item.duration ? item.duration : '—';
        }
    } catch (e) {
        durationLabel = '—';
    }

    addToHistory(id, title, durationLabel, (item.type === 'serie' ? season : null), (item.type === 'serie' ? epIndex : null));
}

function closePlayer() {
    const playerOverlay = document.getElementById('page-player');
    // If fullscreen, try to exit it first
    if (document.fullscreenElement) {
        document.exitFullscreen?.();
    }

    // On close: restore portrait orientation on mobile and ensure top overlay is visible again
    try { lockToPortrait(); } catch(e){}
    try {
        const topOverlay = document.querySelector('.player-overlay');
        if (topOverlay) { topOverlay.style.display = 'flex'; topOverlay.style.pointerEvents = 'none'; }
    } catch(e){}

    // Save final playback position if possible
    try {
        const container = document.getElementById('player-container');
        const v = container.querySelector('video');
        if (v) {
            const cur = v.currentTime || 0;
            const playing = window.__lumina_current_playing || null;
            if (playing && playing.id) {
                addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), Math.round(cur));
            }
        } else if (playerOverlay._vjsPlayer) {
            try {
                const p = playerOverlay._vjsPlayer;
                const cur = typeof p.currentTime === 'function' ? Math.round(p.currentTime()) : 0;
                const playing = window.__lumina_current_playing || null;
                if (playing && playing.id) {
                    addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), cur);
                }
            } catch(e){}
        }
    } catch (e){ console.warn('Error saving final playback position', e); }

    // Remove/stop media playback safely
    const container = document.getElementById('player-container');

    try {
        // Dispose Video.js player if present
        if (playerOverlay._vjsPlayer && typeof playerOverlay._vjsPlayer.dispose === 'function') {
            try { playerOverlay._vjsPlayer.dispose(); } catch(e){ console.warn('Error disposing Video.js player', e); }
            delete playerOverlay._vjsPlayer;
        }

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

    // Remove persistent controls if present, call their cleanup if provided
    const existingControls = document.getElementById('lumina-player-controls');
    if (existingControls) {
        if (typeof existingControls._cleanup === 'function') {
            try { existingControls._cleanup(); } catch(e){/* ignore */ }
        }
        existingControls.remove();
    }

    // trigger close animation then hide after it finishes to free resources
    try {
        // remove any open class and start close animation
        playerOverlay.classList.remove('player-open');
        playerOverlay.classList.remove('player-close');
        void playerOverlay.offsetWidth;
        playerOverlay.classList.add('player-close');
        setTimeout(() => {
            playerOverlay.classList.add('hidden');
            // cleanup close class so next open starts fresh
            playerOverlay.classList.remove('player-close');
            updateContinueWatching();
            // clear current playing marker
            window.__lumina_current_playing = null;
        }, 320);
    } catch (e) {
        playerOverlay.classList.add('hidden');
        updateContinueWatching();
        window.__lumina_current_playing = null;
    }
}

function addToHistory(id, epTitle, duration = null, season = null, epIndex = null, positionSeconds = null) {
    // keep unique per id, store last episode title, duration, season, index and position for better Continue Assistindo info
    // If an entry for this id exists, update it; otherwise insert at top
    let existing = state.history.find(h => h.id === id);
    const now = new Date().toISOString();
    if (existing) {
        existing.lastEpisodeTitle = epTitle || existing.lastEpisodeTitle || null;
        existing.duration = duration || existing.duration || null;
        existing.season = (season !== null ? season : existing.season !== undefined ? existing.season : null);
        existing.episodeIndex = (epIndex !== null ? epIndex : existing.episodeIndex !== undefined ? existing.episodeIndex : null);
        existing.position = (positionSeconds !== null ? positionSeconds : existing.position || 0);
        existing.date = now;
        // move to front
        state.history = state.history.filter(h => h.id !== id);
        state.history.unshift(existing);
    } else {
        const entry = {
            id,
            lastEpisodeTitle: epTitle || null,
            duration: duration || null,
            season: (season !== null ? season : null),
            episodeIndex: (epIndex !== null ? epIndex : null),
            position: (positionSeconds !== null ? positionSeconds : 0),
            date: now
        };
        state.history.unshift(entry);
    }

    // persist only last 20 entries
    if (state.history.length > 20) state.history = state.history.slice(0,20);
    localStorage.setItem('lumina_history', JSON.stringify(state.history));

    // Also mark last-watched pointer for quick lookup (store separately for fast access/highlighting)
    try {
        const pointer = { id, season: (season !== null ? season : null), episodeIndex: (epIndex !== null ? epIndex : null), date: now, position: (positionSeconds !== null ? positionSeconds : 0) };
        localStorage.setItem('lumina_last_watched', JSON.stringify(pointer));
    } catch(e){}
}

function viewAll(type) {
    // Show search-like horizontal list for a specific type
    navigate('search');
    // hide the recommendations section so Search displays the focused "Ver tudo" results
    document.getElementById('recommendations-section')?.classList.add('hidden');

    const results = contentDB.filter(i => i.type === type);
    const grid = document.getElementById('search-results');
    const titleEl = document.getElementById('search-title');
    const emptyEl = document.getElementById('search-empty');

    // clear search input and set title
    const inputEl = document.getElementById('searchInput');
    if (inputEl) inputEl.value = '';
    titleEl.textContent = type === 'serie' ? 'Séries' : 'Filmes';
    titleEl.classList.remove('hidden');

    if (results.length === 0) {
        grid.innerHTML = '';
        emptyEl.classList.remove('hidden');
        // ensure arrows are hidden when no results
        document.getElementById('search-results-wrap')?.classList.add('hide-arrows');
        return;
    } else {
        emptyEl.classList.add('hidden');
    }

    const isSmallScreen = window.innerWidth <= 420;

    const mobileCard = (item, idx) => {
        const lastWatched = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null');
        const lastEp = lastWatched && lastWatched.id === item.id ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${lastWatched.lastEpisodeTitle || ''}</div>` : '';
        const duration = item.duration ? `<span class="text-[11px] text-white/40">${item.duration}</span>` : '';
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                    <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                </div>
                <div class="px-1">
                    <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                    ${lastEp}
                </div>
            </div>
        `;
    };

    if (isSmallScreen) {
        grid.innerHTML = results.map((item, idx) => mobileCard(item, idx)).join('');
    } else {
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

    // ensure search view is scrolled to top of results to avoid leftover vertical gaps
    try { grid.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(e){}

    // Important: ensure the search-results wrapper shows its arrows (remove any hide-arrows left by recommendations)
    document.getElementById('search-results-wrap')?.classList.remove('hide-arrows');

    // Recompute clamp bounds after rendering
    setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 120);
}

/* Render a recommendations horizontal list shown under the search when empty */
function renderRecommendations(limit = 8) {
    const recContainer = document.getElementById('recommendations-list');
    if (!recContainer) return;

    // When recommendations are shown, ensure the search-results wrapper arrows are hidden
    // to avoid duplicate arrow controls appearing beneath the Recommendations section.
    document.getElementById('search-results-wrap')?.classList.add('hide-arrows');

    // Simple recommendation strategy: hero first, then top-rated, then recent movies
    const hero = contentDB.filter(i => i.isHero);
    const rated = contentDB.filter(i => i.ratings).sort((a,b) => (b.ratings.imdb||0) - (a.ratings.imdb||0));
    const recent = contentDB.slice().reverse().filter(i => i.type === 'filme');
    const combined = [...new Set([...hero, ...rated, ...recent, ...contentDB])].slice(0, limit);

    const isSmallScreen = window.innerWidth <= 420;

    const mobileCard = (item, idx) => {
        const lastWatched = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null');
        const lastEp = lastWatched && lastWatched.id === item.id ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${lastWatched.lastEpisodeTitle || ''}</div>` : '';
        const duration = item.duration ? `<span class="text-[11px] text-white/40">${item.duration}</span>` : '';
        return `
            <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                    <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                    <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                    <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                </div>
                <div class="px-1">
                    <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                    <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                    ${lastEp}
                </div>
            </div>
        `;
    };

    if (isSmallScreen) {
        recContainer.innerHTML = combined.map((item, idx) => mobileCard(item, idx)).join('');
    } else {
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
            // hide the duplicate arrows under recommendations by marking the search results wrapper
            document.getElementById('search-results-wrap')?.classList.add('hide-arrows');
            renderRecommendations();
            return;
        }

        // hide recommendations when actively searching
        document.getElementById('recommendations-section')?.classList.add('hidden');
        // ensure arrows reappear for actual search results
        document.getElementById('search-results-wrap')?.classList.remove('hide-arrows');

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

        // Render search results using the same cinematic card used on home for consistency,
        // but on small/mobile screens render the compact Continue Assistindo style for consistency across Search and My List.
        const isSmallScreen = window.innerWidth <= 520;
        const mobileCard = (item, idx) => {
            const lastWatched = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null');
            const lastEp = lastWatched && lastWatched.id === item.id ? `<div class="text-[11px] text-white/50 mt-1 truncate">Último: ${lastWatched.lastEpisodeTitle || ''}</div>` : '';
            const duration = item.duration ? `<span class="text-[11px] text-white/40">${item.duration}</span>` : '';
            return `
                <div onclick="openDetail('${item.id}')" class="card-container snap-item w-72 flex-shrink-0 cursor-pointer group animate-slideUp" style="animation-delay: ${idx * 40}ms">
                    <div class="card-image-wrap aspect-video rounded-2xl mb-3 bg-white/5 relative overflow-hidden">
                        <img src="${item.cover}" class="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy">
                        <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded text-[12px] font-semibold text-white">${item.year || ''}</div>
                        <div class="absolute top-3 left-3 bg-black/30 px-2 py-1 rounded text-[11px] text-white/80">${duration}</div>
                    </div>
                    <div class="px-1">
                        <p class="text-sm font-bold truncate text-white/90 group-hover:text-purple-400 transition-colors">${item.title}</p>
                        <p class="text-[11px] text-white/40 truncate">${item.category || ''}</p>
                        ${lastEp}
                    </div>
                </div>
            `;
        };

        if (isSmallScreen) {
            grid.innerHTML = results.map((item, idx) => mobileCard(item, idx)).join('');
        } else {
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
        }
    });
}

function clearFavorites() {
    // ask for confirmation to avoid accidental clearing
    if (!confirm('Tem certeza que deseja limpar sua lista? Esta ação removerá todos os itens salvos.')) return;
    state.favorites = [];
    localStorage.setItem('lumina_favorites', JSON.stringify(state.favorites));
    renderMyList();
}

// Smooth scroll helper for list arrows
function scrollList(containerId, dir = 1) {
    const el = document.getElementById(containerId);
    if (!el) return;

    // If mobile (narrow viewport), scroll exactly one card and center it
    const isMobile = window.innerWidth <= 520;
    const children = Array.from(el.children).filter(c => c.classList && c.classList.contains('snap-item'));
    if (isMobile && children.length) {
        try {
            const containerCenter = el.scrollLeft + (el.clientWidth / 2);
            // find index of child whose center is nearest to current center
            let closestIndex = 0;
            let closestDist = Infinity;
            children.forEach((child, idx) => {
                const childCenter = child.offsetLeft + (child.clientWidth / 2);
                const dist = Math.abs(childCenter - containerCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIndex = idx;
                }
            });

            // target index is one step in dir direction
            let targetIndex = closestIndex + (dir > 0 ? 1 : -1);
            if (targetIndex < 0) targetIndex = 0;
            if (targetIndex >= children.length) targetIndex = children.length - 1;

            const targetChild = children[targetIndex];
            // compute scrollLeft to center the target child
            const targetLeft = Math.max(0, targetChild.offsetLeft - (el.clientWidth - targetChild.clientWidth) / 2);
            el.scrollTo({ left: targetLeft, behavior: 'smooth' });
            return;
        } catch (e) {
            // fallback to previous behavior on error
        }
    }

    // Desktop / fallback: amount is roughly 80% of container width for a noticeable page-like scroll
    const amount = Math.round(el.clientWidth * 0.78) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
}

/* --- Name prompt + deep-link handling --- */
function showNamePrompt(onComplete) {
    const modal = document.getElementById('name-prompt');
    const card = document.getElementById('name-prompt-card');
    const input = document.getElementById('visitorNameInput');
    const saveBtn = document.getElementById('saveNameBtn');
    const skipBtn = document.getElementById('skipNameBtn');

    // reveal overlay and play enter animation (use inline style to ensure visibility across environments)
    modal.classList.remove('hidden');
    // explicitly set display:flex in case 'hidden' class persists / tooling issues
    modal.style.display = 'flex';
    // small timeout to allow paint before adding animated 'show' state
    setTimeout(() => modal.classList.add('show'), 20);
    // ensure card animation runs from fresh state
    card.classList.remove('leave');
    void card.offsetWidth;
    card.classList.add('enter');
    // set focus after a small delay to allow animation to begin (improves mobile keyboard behavior)
    setTimeout(() => input.focus(), 220);

    // Accessibility: trap focus inside modal while open (basic)
    const focusable = [input, saveBtn, skipBtn];
    let focusIndex = 0;
    function handleKey(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            focusIndex = (e.shiftKey ? focusIndex - 1 : focusIndex + 1);
            if (focusIndex < 0) focusIndex = focusable.length - 1;
            if (focusIndex >= focusable.length) focusIndex = 0;
            focusable[focusIndex].focus();
        } else if (e.key === 'Escape') {
            cleanupAndFinish('');
        }
    }
    document.addEventListener('keydown', handleKey);

    const finish = (name) => {
        // play leave animation
        card.classList.remove('enter');
        card.classList.add('leave');
        // wait for animation end then hide
        card.addEventListener('animationend', function onEnd() {
            card.removeEventListener('animationend', onEnd);
            modal.classList.remove('show');
            modal.classList.add('hidden');
            // hide inline display to ensure it can be shown again reliably
            modal.style.display = 'none';
            // reset card state for next open
            card.classList.remove('leave');
            // restore body scroll
            try { document.body.style.overflow = 'auto'; } catch (e) {}
            // cleanup keyboard trap
            document.removeEventListener('keydown', handleKey);
            if (typeof onComplete === 'function') onComplete(name);
        }, { once: true });
    };

    const cleanupAndFinish = (name) => {
        // ensure handlers removed and finalize
        saveBtn.onclick = null;
        skipBtn.onclick = null;
        input.removeEventListener('keyup', inputKeyListener);
        finish(name);
    };

    const submit = () => {
        const name = (input.value || '').trim();
        if (name) {
            localStorage.setItem('lumina_name', name);
            cleanupAndFinish(name);
        } else {
            // allow empty as explicit skip
            cleanupAndFinish('');
        }
    };

    const inputKeyListener = (e) => { if (e.key === 'Enter') submit(); };
    saveBtn.onclick = submit;
    skipBtn.onclick = () => cleanupAndFinish('');
    input.addEventListener('keyup', inputKeyListener);

    // For a more app-like experience, require explicit actions (buttons) to dismiss the name prompt.
    // (Remove outside-click-to-close behavior to avoid accidental dismissal.)
    // Note: keeping focus trap and explicit Save/Pular buttons for dismissal.
}

function handleDeepLinkPlay(id) {
    if (!id) return;
    const item = contentDB.find(i => i.id === id);
    if (!item) return;
    // ensure item is in favorites per requirement
    if (!state.favorites.includes(id)) {
        state.favorites.push(id);
        localStorage.setItem('lumina_favorites', JSON.stringify(state.favorites));
    }
    // If series, play first episode of season 1 index 0; else play movie directly
    if (item.type === 'serie') {
        // prefer season '1' if exists, otherwise first season key
        const seasonKey = item.seasons['1'] ? '1' : Object.keys(item.seasons)[0];
        playMedia(id, seasonKey, 0);
    } else {
        playMedia(id, '', 0);
    }
}

/* On load: show name prompt if not set, then initialize and handle ?play= deep link
   Improved: use DOMContentLoaded, defensive null checks and small throttles to avoid heavy work during load on mobile. */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const params = new URLSearchParams(location.search || '');
        const deepPlay = params.get('play');

        const storedName = localStorage.getItem('lumina_name');
        if (!storedName) {
            // show prompt, then init and handle deep link after user submits/skip
            showNamePrompt((givenName) => {
                try {
                    if (givenName !== null && givenName !== undefined) {
                        localStorage.setItem('lumina_name', givenName || '');
                    }
                } catch (e) {}
                // initialize app and then handle deep play if present
                init(deepPlay);
                if (deepPlay) {
                    // small timeout to ensure UI ready
                    setTimeout(() => {
                        try { handleDeepLinkPlay(deepPlay); } catch(e){}
                    }, 600);
                }
            });
        } else {
            // name exists: init immediately and handle deep play
            init(deepPlay);
            if (deepPlay) {
                setTimeout(() => {
                    try { handleDeepLinkPlay(deepPlay); } catch(e){}
                }, 400);
            }
        }
    } catch (e) {
        // fallback: ensure app still initializes even if URL parsing fails
        try { init(null); } catch (err) { console.error('Init failed', err); }
    }
});

/* --- Player persistent controls helper (injects a fixed overlay visible in fullscreen) --- */

/* Mobile orientation helpers: try to lock to landscape when player opens and restore portrait when closed */
function lockToLandscape() {
    try {
        if (screen && screen.orientation && typeof screen.orientation.lock === 'function') {
            screen.orientation.lock('landscape').catch(()=>{/* ignore */});
        } else if (screen && typeof screen.lockOrientation === 'function') {
            try { screen.lockOrientation('landscape'); } catch(e){}
        }
    } catch (e) {}
}
function lockToPortrait() {
    try {
        if (screen && screen.orientation && typeof screen.orientation.lock === 'function') {
            screen.orientation.lock('portrait-primary').catch(()=>{ try { screen.orientation.unlock?.(); } catch(e){} });
        } else if (screen && typeof screen.unlockOrientation === 'function') {
            try { screen.unlockOrientation(); } catch(e){}
        }
    } catch (e) {}
}

/* Controls and overlay behavior on mobile for non-custom embeds:
   When a player uses our custom controls we show the top overlay (REPRODUZINDO + back).
   For non-custom iframe/native embeds on mobile we hide that top overlay so clicks on the iframe
   do not open or interfere with the overlay controls. */
function updateOverlayForMobile(playerOverlay, hasCustomControls) {
    try {
        const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
        const topOverlay = document.querySelector('.player-overlay');
        if (!topOverlay) return;
        if (isMobile) {
            if (hasCustomControls) {
                topOverlay.style.display = 'flex';
                // keep pointer-events none on container, but make internal controls interactive (existing CSS handles that)
                topOverlay.style.pointerEvents = 'none';
            } else {
                // hide completely so taps on iframe don't trigger any top UI
                topOverlay.style.display = 'none';
                topOverlay.style.pointerEvents = 'none';
            }
        } else {
            // desktop/tablet: always show overlay (original behavior)
            topOverlay.style.display = 'flex';
            topOverlay.style.pointerEvents = 'none';
        }
    } catch (e) {}
}

function createPlayerControls(playerOverlay, canControlVideo, getPlayerFn, options = {}) {
    // mark that custom controls were requested for this overlay so other code can react (e.g. overlay visibility)
    try { if (playerOverlay) playerOverlay._hasCustomControls = true; } catch(e){}
    // if caller requests skipping controls (e.g. Google Drive embeds), mark that we did NOT create custom controls and do nothing
    if (options && options.skipControls) {
        try { if (playerOverlay) playerOverlay._hasCustomControls = false; } catch(e){}
        return;
    }

    // avoid duplicating
    if (document.getElementById('lumina-player-controls')) return;

    // inject stylesheet once (includes auto-hide behavior)
    if (!document.getElementById('lumina-player-controls-css')) {
        const css = document.createElement('style');
        css.id = 'lumina-player-controls-css';
        css.innerHTML = `
#lumina-player-controls {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: 18px;
    z-index: 99999;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    pointer-events: none;            /* default: not interactive until shown */
    opacity: 0;
    transition: opacity 260ms cubic-bezier(.2,.9,.2,1), transform 260ms;
    transform: translateY(8px);
}
#lumina-player-controls.visible {
    pointer-events: auto;
    opacity: 1;
    transform: translateY(0);
}
#lumina-player-controls .lpc-btn {
    min-width: 52px;
    height: 52px;
    border-radius: 12px;
    background: linear-gradient(90deg,#7c3aed,#d946ef);
    display:flex;align-items:center;justify-content:center;color:white;font-size:18px;border:none;box-shadow:0 8px 30px rgba(124,58,237,0.18);
}
#lumina-player-controls .lpc-secondary {
    min-width: 48px;
    height:48px;
    border-radius:12px;
    background: rgba(255,255,255,0.04);
    display:flex;align-items:center;justify-content:center;color:white;font-size:16px;border:1px solid rgba(255,255,255,0.06);
}
#lumina-player-controls .lpc-range { width: 40%; height: 6px; -webkit-appearance:none; appearance:none; border-radius:6px; background: rgba(255,255,255,0.08);}
#lumina-player-controls .lpc-range::-webkit-slider-thumb { -webkit-appearance:none; width:14px;height:14px;border-radius:999px;background:#fff;box-shadow:0 4px 18px rgba(0,0,0,0.4); }
@media (max-width:520px) {
    #lumina-player-controls { left:8px; right:8px; bottom:12px; gap:8px; }
    #lumina-player-controls .lpc-range{width:35%;}
}
        `;
        document.head.appendChild(css);
    }

    const controls = document.createElement('div');
    controls.id = 'lumina-player-controls';
    // start hidden; we'll add .visible when user interacts
    controls.classList.remove('visible');
    controls.innerHTML = `
        <button class="lpc-secondary lpc-btn-close" title="Fechar (Esc)"><i class="fa-solid fa-arrow-left"></i></button>
        <button class="lpc-secondary lpc-btn-prev-ep" title="Episódio Anterior"><i class="fa-solid fa-backward-step"></i></button>
        <button class="lpc-secondary lpc-btn-back" title="-10s"><i class="fa-solid fa-rotate-left"></i></button>
        <button class="lpc-btn lpc-btn-play" title="Play/Pause"><i class="fa-solid fa-play"></i></button>
        <button class="lpc-secondary lpc-btn-forward" title="+10s"><i class="fa-solid fa-rotate-right"></i></button>
        <button class="lpc-secondary lpc-btn-next-ep" title="Próximo Episódio"><i class="fa-solid fa-forward-step"></i></button>
        <input class="lpc-range" type="range" min="0" max="100" value="0" />
        <button class="lpc-secondary lpc-btn-full" title="Fullscreen"><i class="fa-solid fa-expand"></i></button>
    `;
    // attach controls inside the player-frame-wrapper when available so they persist in fullscreen, fallback to body
    const attachPoint = document.getElementById('player-frame-wrapper') || document.getElementById('player-container') || document.body;
    attachPoint.appendChild(controls);

    // helpers to get video-like control (Video.js player or native video element)
    function resolvePlayer() {
        try {
            if (canControlVideo && typeof getPlayerFn === 'function') {
                return getPlayerFn();
            }
        } catch (e) {}
        // fallback: try to find native video in player-container
        const container = document.getElementById('player-container');
        if (!container) return null;
        const v = container.querySelector('video');
        return v || null;
    }

    const playBtn = controls.querySelector('.lpc-btn-play');
    const closeBtn = controls.querySelector('.lpc-btn-close');
    const backBtn = controls.querySelector('.lpc-btn-back');
    const fwdBtn = controls.querySelector('.lpc-btn-forward');
    const fullBtn = controls.querySelector('.lpc-btn-full');
    const range = controls.querySelector('.lpc-range');

    function updatePlayIcon(isPlaying) {
        playBtn.innerHTML = `<i class="fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}"></i>`;
    }

    // Connect to video / player - support Video.js player API or native <video>
    function getCurrentMedia() {
        const p = resolvePlayer();
        if (!p) {
            // fallback: try to find native video in player-container
            const container = document.getElementById('player-container');
            if (!container) return null;
            const v = container.querySelector('video');
            return v || null;
        }
        // Video.js player instance: provide a simple facade
        if (p && typeof p.play === 'function' && typeof p.currentTime === 'function' && typeof p.duration === 'function') {
            return {
                type: 'videojs',
                instance: p,
                play: () => p.play(),
                pause: () => p.pause(),
                paused: () => p.paused ? p.paused() : false,
                currentTime: (v) => typeof v === 'number' ? p.currentTime(v) : p.currentTime(),
                duration: () => p.duration ? p.duration() : NaN,
                mute: (m) => p.muted ? p.muted(m) : null
            };
        }
        // native <video> element
        if (p && p.tagName && p.tagName.toLowerCase() === 'video') {
            const v = p;
            return {
                type: 'native',
                instance: v,
                play: () => v.play(),
                pause: () => v.pause(),
                paused: () => v.paused,
                currentTime: (val) => typeof val === 'number' ? (v.currentTime = val) : v.currentTime,
                duration: () => v.duration || NaN,
                mute: (m) => v.muted = !!m
            };
        }
        return null;
    }

    // Play/pause toggle
    playBtn.addEventListener('click', () => {
        const media = getCurrentMedia();
        if (!media) return;
        try {
            if (media.paused()) {
                media.play();
                updatePlayIcon(true);
            } else {
                media.pause();
                updatePlayIcon(false);
            }
        } catch (e) {
            // best-effort
        }
    });

    // close player
    closeBtn.addEventListener('click', () => {
        closePlayer();
    });

    backBtn.addEventListener('click', () => {
        const media = getCurrentMedia();
        if (!media) return;
        try {
            const cur = media.currentTime();
            media.currentTime(Math.max(0, cur - 10));
        } catch(e){}
    });
    fwdBtn.addEventListener('click', () => {
        const media = getCurrentMedia();
        if (!media) return;
        try {
            const cur = media.currentTime();
            const dur = media.duration() || 0;
            media.currentTime(Math.min(dur, cur + 10));
        } catch(e){}
    });

    // Next / Previous Episode handlers: use the current playing context to jump to adjacent episodes if available.
    const prevEpBtn = controls.querySelector('.lpc-btn-prev-ep');
    const nextEpBtn = controls.querySelector('.lpc-btn-next-ep');

    function navigateEpisode(delta) {
        try {
            // Try to get the current playing context from memory, fall back to last-watched pointer
            let playing = window.__lumina_current_playing || null;
            if (!playing || !playing.id) {
                try { playing = JSON.parse(localStorage.getItem('lumina_last_watched') || 'null'); } catch(e) { playing = null; }
            }
            if (!playing || !playing.id) return;

            const item = contentDB.find(i => i.id === playing.id);
            if (!item || item.type !== 'serie') return;
            const seasons = item.seasons || {};
            const seasonKeys = Object.keys(seasons).sort((a,b) => Number(a) - Number(b));
            // Resolve a valid season key: prefer playing.season, then last-watched, then first available season
            let seasonKey = (playing.season !== null && playing.season !== undefined) ? String(playing.season) : null;
            if (!seasonKey || !seasons[seasonKey]) {
                seasonKey = seasonKeys.length ? String(seasonKeys[0]) : null;
            }
            if (!seasonKey) return;

            // Resolve a numeric episode index robustly
            let idx = (playing.episodeIndex !== null && playing.episodeIndex !== undefined) ? Number(playing.episodeIndex) : 0;
            if (isNaN(idx) || idx < 0) idx = 0;

            const eps = seasons[seasonKey] || [];
            const newIdx = idx + Number(delta || 0);

            // If within same season, play directly
            if (newIdx >= 0 && newIdx < eps.length) {
                playMedia(playing.id, seasonKey, newIdx);
                return;
            }

            // Otherwise try adjacent seasons (previous or next)
            const currentSeasonIndex = seasonKeys.indexOf(seasonKey);
            const targetSeasonIndex = delta > 0 ? currentSeasonIndex + 1 : currentSeasonIndex - 1;
            if (targetSeasonIndex >= 0 && targetSeasonIndex < seasonKeys.length) {
                const targetSeason = String(seasonKeys[targetSeasonIndex]);
                const targetEps = seasons[targetSeason] || [];
                const targetIdx = delta > 0 ? 0 : Math.max(0, targetEps.length - 1);
                playMedia(playing.id, targetSeason, targetIdx);
                return;
            }

            // If we reach here nothing changed (either out of bounds or single-episode series) — no-op
        } catch (e) {
            console.warn('navigateEpisode error', e);
        }
    }

    if (prevEpBtn) {
        prevEpBtn.addEventListener('click', () => navigateEpisode(-1));
    }
    if (nextEpBtn) {
        nextEpBtn.addEventListener('click', () => navigateEpisode(1));
    }

    fullBtn.addEventListener('click', () => {
        const wrapper = document.getElementById('player-frame-wrapper') || document.getElementById('player-container');
        if (wrapper.requestFullscreen) wrapper.requestFullscreen();
    });

    // range scrubber (updates position when playing video)
    let scrubUpdating = false;
    range.addEventListener('input', () => {
        const media = getCurrentMedia();
        if (!media) return;
        const dur = media.duration() || 0;
        const pct = parseFloat(range.value || 0) / 100;
        const t = dur * pct;
        try { media.currentTime(t); } catch(e){}
    });

    // periodic UI sync
    const syncInterval = setInterval(() => {
        const media = getCurrentMedia();
        if (!media) return;
        try {
            const dur = media.duration() || 0;
            const cur = media.currentTime();
            if (!isNaN(dur) && dur > 0) {
                const pct = Math.max(0, Math.min(1, cur / dur)) * 100;
                if (!scrubUpdating) range.value = String(Math.round(pct));
            }
            updatePlayIcon(!media.paused());

            // Save current playback position periodically (every sync) for this playing item
            const playing = window.__lumina_current_playing || null;
            if (playing && playing.id && typeof cur === 'number' && !isNaN(cur)) {
                // persist seconds rounded to integer
                addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), Math.round(cur));
            }
        } catch (e) {}
    }, 500);

    // Auto-hide / show behavior: show controls on pointermove / click / touchstart and hide after inactivity
    let hideTimer = null;
    const HIDE_DELAY = 2500; // ms

    // references to UI parts that should sync with these controls (YouTube overlay and top overlay)
    const getYTButton = () => document.getElementById('lumina-yt-playpause');
    const getTopOverlay = () => document.querySelector('.player-overlay');

    function showControls() {
        try {
            controls.classList.add('visible');

            // reveal YT overlay button if present; keep top "REPRODUZINDO" overlay non-interactive
            const ytBtn = getYTButton();
            const topOverlay = getTopOverlay();
            if (ytBtn) {
                ytBtn.style.transition = 'opacity 160ms';
                ytBtn.style.opacity = '1';
                ytBtn.style.pointerEvents = 'auto';
            }
            if (topOverlay) {
                // show visually and enable pointer-events so the top overlay buttons become interactive
                topOverlay.style.transition = 'opacity 160ms';
                topOverlay.style.opacity = '1';
                topOverlay.style.pointerEvents = 'auto';
            }

            // clear previous hide timer
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            hideTimer = setTimeout(() => {
                controls.classList.remove('visible');
                // hide extras
                if (ytBtn) {
                    ytBtn.style.opacity = '0';
                    ytBtn.style.pointerEvents = 'none';
                }
                if (topOverlay) {
                    topOverlay.style.opacity = '0';
                    // overlay container remains pointer-events:none so embedded players stay clickable
                }
            }, HIDE_DELAY);
        } catch (e) {}
    }

    function immediateHide() {
        try {
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            controls.classList.remove('visible');
            const ytBtn = getYTButton();
            const topOverlay = getTopOverlay();
            if (ytBtn) {
                ytBtn.style.opacity = '0';
                ytBtn.style.pointerEvents = 'none';
            }
            if (topOverlay) {
                // ensure overlay does not block clicks when controls are hidden
                topOverlay.style.opacity = '0';
                topOverlay.style.pointerEvents = 'none';
            }
        } catch (e) {}
    }

    // attach pointer listeners to the overlay and attachPoint so interactions reveal controls
    const pointerTargets = [playerOverlay, attachPoint, controls];
    pointerTargets.forEach(t => {
        try {
            if (!t) return;
            t.addEventListener('mousemove', showControls, { passive: true });
            t.addEventListener('click', showControls, { passive: true });
            t.addEventListener('touchstart', showControls, { passive: true });
        } catch (e) {}
    });

    // Also show controls when media starts buffering/playing via sync loop - helpful for remote players
    const autoShowOnMedia = setInterval(() => {
        const media = getCurrentMedia();
        if (!media) return;
        try {
            if (!media.paused && !media.paused()) {
                showControls();
            }
        } catch (e) {}
    }, 2000);

    // cleanup when player closed
    controls._cleanup = () => {
        clearInterval(syncInterval);
        clearInterval(autoShowOnMedia);
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        // remove event listeners
        pointerTargets.forEach(t => {
            try {
                if (!t) return;
                t.removeEventListener('mousemove', showControls);
                t.removeEventListener('click', showControls);
                t.removeEventListener('touchstart', showControls);
            } catch (e) {}
        });
        // ensure overlay removed
        try { controls.remove(); } catch(e){}
        // also remove rotate overlay if exists
        const rot = document.getElementById('lumina-rotate-overlay');
        if (rot) rot.remove();
        // when we remove custom controls, mark overlay state on player element
        try { if (playerOverlay) playerOverlay._hasCustomControls = false; } catch(e){}
    };
}

 // expose functions/globals
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
// expose season-pill helper to global scope so inline onclick handlers work in module context
window.toggleSeasonPills = toggleSeasonPills;
// expose addToHistory globally so inline onclick handlers inside rendered HTML can call it
window.addToHistory = addToHistory;

// Suppress a noisy browser Promise rejection when play() is interrupted by removing the media element.
// This prevents the console spam: "The play() request was interrupted because the media was removed from the document."
window.addEventListener('unhandledrejection', (evt) => {
    try {
        const reason = evt?.reason;
        const msg = (typeof reason === 'string') ? reason : (reason && reason.message) ? reason.message : '';
        if (msg && msg.includes('The play() request was interrupted because the media was removed')) {
            // prevent default logging for this known benign race condition
            evt.preventDefault?.();
        }
    } catch (e) {
        // silent fallback
    }
});
