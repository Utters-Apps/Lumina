        // Ensure all images use lazy loading and async decoding for better performance and deferred resource usage.
        (function(){
            function setLazyForExistingImgs() {
                try {
                    document.querySelectorAll('img').forEach(img => {
                        try {
                            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                        } catch(_) {}
                    });
                } catch(_) {}
            }
            // Apply as soon as DOM is ready, and observe new images inserted later to keep them lazy
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    setLazyForExistingImgs();
                    // observe future image additions
                    const mo = new MutationObserver((mut) => {
                        for (const m of mut) {
                            if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                                m.addedNodes.forEach(node => {
                                    try {
                                        if (node && node.nodeType === 1) {
                                            if (node.tagName && node.tagName.toLowerCase() === 'img') {
                                                if (!node.hasAttribute('loading')) node.setAttribute('loading','lazy');
                                                if (!node.hasAttribute('decoding')) node.setAttribute('decoding','async');
                                            } else {
                                                node.querySelectorAll && node.querySelectorAll('img').forEach(i => {
                                                    if (!i.hasAttribute('loading')) i.setAttribute('loading','lazy');
                                                    if (!i.hasAttribute('decoding')) i.setAttribute('decoding','async');
                                                });
                                            }
                                        }
                                    } catch(_) {}
                                });
                            } else if (m.type === 'attributes' && m.target && m.target.tagName && m.target.tagName.toLowerCase() === 'img') {
                                try {
                                    const img = m.target;
                                    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                                    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                                } catch(_) {}
                            }
                        }
                    });
                    try { mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] }); } catch(_) {}
                });
            } else {
                setLazyForExistingImgs();
                const mo = new MutationObserver((mut) => {
                    for (const m of mut) {
                        if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
                            m.addedNodes.forEach(node => {
                                try {
                                    if (node && node.nodeType === 1) {
                                        if (node.tagName && node.tagName.toLowerCase() === 'img') {
                                            if (!node.hasAttribute('loading')) node.setAttribute('loading','lazy');
                                            if (!node.hasAttribute('decoding')) node.setAttribute('decoding','async');
                                        } else {
                                            node.querySelectorAll && node.querySelectorAll('img').forEach(i => {
                                                if (!i.hasAttribute('loading')) i.setAttribute('loading','lazy');
                                                if (!i.hasAttribute('decoding')) i.setAttribute('decoding','async');
                                            });
                                        }
                                    }
                                } catch(_) {}
                            });
                        } else if (m.type === 'attributes' && m.target && m.target.tagName && m.target.tagName.toLowerCase() === 'img') {
                            try {
                                const img = m.target;
                                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                                if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                            } catch(_) {}
                        }
                    }
                });
                try { mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] }); } catch(_) {}
            }
        })();

        // Auto-hide splash: fade and remove after intro completes (safeguard)
        (function(){
            const splash = document.getElementById('splash-screen');
            if (!splash) return;
            // remove splash after animations complete (~5.2s). Keep fallback to 7s for slow devices.
            const REMOVE_DELAY = 5200;
            const FINAL_FALLBACK = 7200;
            const doRemove = () => {
                try {
                    splash.style.transition = 'opacity 420ms ease, visibility 420ms';
                    splash.style.opacity = '0';
                    splash.style.visibility = 'hidden';
                    setTimeout(() => {
                        try { splash.remove(); document.body.style.overflow = ''; } catch(_) {}
                    }, 480);
                } catch(e) { try { splash.remove(); document.body.style.overflow = ''; } catch(_) {} }
            };
            setTimeout(doRemove, REMOVE_DELAY);
            setTimeout(() => { if (document.getElementById('splash-screen')) doRemove(); }, FINAL_FALLBACK);

            // prevent background scroll while splash present
            document.body.style.overflow = 'hidden';
        })();

        // --- DATABASE ---
        const db = [
            {
                id: 'espiritos-na-escola',
                title: 'Espíritos na Escola',
                type: 'serie',
                category: 'Mistério / Sobrenatural',
                year: '2023',
                cover: 'https://pbs.twimg.com/media/FzKWtbPWABwDiL0.jpg',
                description: 'Maddie Nears, uma adolescente que morre misteriosamente e fica presa como fantasma em sua escola, junta-se a outros espíritos para investigar sua morte enquanto tenta se comunicar com os vivos.',
                tags: ['Popular','Nova Temporada'],
                ageRating: '16',
                nextEpisodeTrigger: 30,
                seasons: {
                    1: [
                        { id: 's1-e1', title: "Minha Pseudomorte", url: "https://dl.dropboxusercontent.com/scl/fi/htknkiialy93hzraetpcd/S_S_1_1_D.mp4?rlkey=ty47sz6y2ej2qravzldnx99wm", introStart: 173, introDuration: 55 },
                        { id: 's1-e2', title: "Cicatrizes Antigas", url: "https://dl.dropboxusercontent.com/scl/fi/jav89oume4akjlk8qjwwg/S_S_1_2_D.mp4?rlkey=gljyx2b9iy91ykig9bwowx2os", introStart: 230, introDuration: 55 },
                        { id: 's1-e3', title: "Morta e Confusa", url: "https://dl.dropboxusercontent.com/scl/fi/9cn2dfxkoqfcest7t1qs1/S_S_1_3_D.mp4?rlkey=p1vkpf7b6d84sughzwfmosoux", introStart: 109, introDuration: 55 },
                        { id: 's1-e4', title: "Intenções Mórbidas", url: "https://dl.dropboxusercontent.com/scl/fi/gwjr3n3jp7y0i3bg7y1w2/S_S_1_4_D-1.mp4?rlkey=xkqye3296xnjc0y955z7eqedc", introStart: 119, introDuration: 55 },
                        { id: 's1-e5', title: "O Passado Entra em Campo", url: "https://dl.dropboxusercontent.com/scl/fi/eajat75t4zeeq1usv7ifa/S_S_1_5_D.mp4?rlkey=dlaqabp1m3g9o2ankaa7okhsk", introStart: 83, introDuration: 55 },
                        { id: 's1-e6', title: "Os Fantasmas se Divertem no Baile", url: "https://dl.dropboxusercontent.com/scl/fi/1uk571r9d12h0otsasdnp/S_S_1_6_D.mp4?rlkey=xp4z4l5dv4zj210ohyc53fj58", introStart: 196, introDuration: 55 },
                        { id: 's1-e7', title: "A Última Sessão Mediúnica", url: "https://dl.dropboxusercontent.com/scl/fi/8h4lqdo5f1daf4zxc6yeh/S_S_1_7_D.mp4?rlkey=0bt8rn6wquag21y7iwpaj06r5", introStart: 386, introDuration: 55 },
                        { id: 's1-e8', title: "O Corpo de Madison", url: "https://dl.dropboxusercontent.com/scl/fi/in5mqnt7qhr34tyxlo9zt/S_S_1_8_D.mp4?rlkey=q7nowznikoj38lnvad9g4jwbq", introStart: 211, introDuration: 55 }
                    ],
                    2: [
                        { id: 's2-e1', title: "O Que Terá Acontecido a Maddie Nears?", url: "https://dl.dropboxusercontent.com/scl/fi/erfoa38zyjkll3z252pox/SSPRTS_2_1.mp4?rlkey=96tmhe507k8tsqueakqd6b9oo" },
                        { id: 's2-e2', title: "Campo dos Gritos", url: "https://dl.dropboxusercontent.com/scl/fi/g50i68mjnp63fky9ww2lq/SSPRTS_2_2.mp4?rlkey=6gy3g6laqgwa3qw6s4un9c5qp" },
                        { id: 's2-e3', title: "Mal Posso Assombrar", url: "https://dl.dropboxusercontent.com/scl/fi/8gcuxbsr0cmm3u8oqmp5r/SSPRTS_2_3.mp4?rlkey=tlsg1vc089sr3oq5d0rk1z9tt" },
                        { id: 's2-e4', title: "Uma Troca de Corpos Para Recordar", url: "https://dl.dropboxusercontent.com/scl/fi/cka8c8cjwq77a7cyir9h2/SPRTSNSCL_2_4.mp4?rlkey=to8417he1echsb0yyakq4msrb" },
                        { id: 's2-e5', title: "Adivinhe Quem Vem Para Assombrar", url: "https://dl.dropboxusercontent.com/scl/fi/bo40mxke2dd0ua5j6i2mz/ESPRTSNESCL_2_5.mp4?rlkey=jn1opprduik1yycb33y8hqf78" },
                        { id: 's2-e6', title: "Assombração em Conflito", url: "https://dl.dropboxusercontent.com/scl/fi/4ad5lshp9nayiyvpd43h1/SCHLSPRTS_2_6.mp4?rlkey=cilch3l3un75nw0cgg0qyl6t2" },
                        { id: 's2-e7', title: "Anatomia de um Abrigo Nuclear", url: "https://dl.dropboxusercontent.com/scl/fi/pwu7ta12jqnw9atmzgzha/SCHLSPRTS_2_7.mp4?rlkey=9mpeejrebfa90uayg1wzf7gwn" },
                        { id: 's2-e8', title: "Fogo, Fale Comigo", url: "https://dl.dropboxusercontent.com/scl/fi/8slbpn2laeflspv59k6i4/SCHLSPRT_2_8.mp4?rlkey=m2f8kzp3crv1q07374qpay2gi" }
                    ],
                    3: [
                        { id: 's3-e1', title: "É uma Maravilhosa Vida Após a Morte", url: "https://dl.dropboxusercontent.com/scl/fi/mfbd64a59ylslnn0az6lz/SCHLSPRTS31D.mp4?rlkey=tq0vwqkeqjzzchlp46z06ts0d" },
                        { id: 's3-e2', title: "Fantasmas Malvados", url: "https://dl.dropboxusercontent.com/scl/fi/md68ne26zj5l2smw94e1y/SCHLSPRTS32D.mp4?rlkey=b27e35a8ybnad8udf9x0h75rz" },
                        { id: 's3-e3', title: "Olhos nos Corredores", url: "https://dl.dropboxusercontent.com/scl/fi/wg1s89w8orupcg4rmzyk8/SCHLSPRTS33D.mp4?rlkey=fwjxi5vtvsfgtmkw9q9wad6yu" },
                        { id: 's3-e4', title: "O Clube dos Desamparados", url: "https://dl.dropboxusercontent.com/scl/fi/y52g4ul1ao26a1shif84x/SCHLSPRTS34D.mp4?rlkey=gvjm36rehhxoooe7jku2kvlfp" },
                        { id: 's3-e5', title: "Em Busca da Cicatriz Perdida", url: "https://dl.dropboxusercontent.com/scl/fi/km38h1xiy6awc4jhv88jb/SCHLSPRTS35D.mp4?rlkey=zqqorxpvkrt94qvclik28pdmb" },
                        { id: 's3-e6', title: "Filhos do Desprezo", url: "https://dl.dropboxusercontent.com/scl/fi/j1dbnj5olclc2suow7qng/SCHLSPRTS36D.mp4?rlkey=c4or26clmgkxsq7jbi1l4dmr4" },
                        { id: 's3-e7', title: "Meio do Semestre", url: "https://dl.dropboxusercontent.com/scl/fi/3erg54smh5zd761ln3uxx/SCHLSPRTS37D.mp4?rlkey=xa3zz1bqk19pf7x6ykj8cbfsi&st=gymsyj7k" },
                        { id: 's3-e8', title: "O Despertar da Debutante", url: "https://dl.dropboxusercontent.com/scl/fi/gpvao0x30e7oqgz2wnwg3/SCHLSPRTS38D.mp4?rlkey=vxrxl5dmu6mtknsobnbdwoqc0&st=9nywbe3d" }
                    ]
                }
            },
            {
                id: 'diario-banana-1',
                title: 'Diário de um Banana',
                type: 'filme',
                category: 'Comédia / Família',
                year: '2010',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/53bd6d9c03d61fecdee73974365e26b3276e3b7e2fb93f9319b28eebc1c0fa26._SX1080_FMjpg_.jpg',
                description: 'Greg Heffley está destinado a grandes coisas, mas primeiro ele precisa sobreviver à coisa mais assustadora e humilhante de todas: o ensino fundamental.',
                ageRating: '10',
                id_ep: 'tos-f1',
                url: 'https://dl.dropboxusercontent.com/scl/fi/xmbc1o9bk71gicks8bpqb/Di-rio-de-um-Banana-1.mp4?rlkey=3rpbwzkw19xeuwmws6x38mfo8&st=vszl2y2u'
            },
            {
                id: 'diario-banana-2',
                title: 'Diário de um Banana 2',
                type: 'filme',
                category: 'Comédia / Irmãos',
                year: '2011',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/12bd2a9871c75d6abfddb48638342629f8190b81c3784e15e468eb3c96d53e31._UR1920,1080_.jpg',
                description: 'De volta às aulas, Greg e seu irmão mais velho Rodrick lidam com suas tentativas hilárias e desajeitadas de se darem bem (ou não).',
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/mwlvt4p7497r4snvv37da/Di-rio-de-um-Banana-2.mp4?rlkey=rm3q3ksucfyvtejxnosapt5zc&st=65e4hzyl'
            },
            {
                id: 'diario-banana-3',
                title: 'Diário de um Banana 3',
                type: 'filme',
                category: 'Comédia / Verão',
                year: '2012',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/019b2f32-b4d6-7163-9299-3e0e72111f11/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'As férias de verão chegaram e Greg quer passar o tempo jogando videogame, mas seu pai tem outros planos para ele.',
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/dma341td6ewlncklcgw09/Diario-de-um-Banana-3.mp4?rlkey=3hjk9c3gvjgo7z5997odft7l7&st=87n3lyb1'
            },
            {
                id: 'stranger-things',
                title: 'Stranger Things',
                type: 'serie',
                category: 'Sci-Fi / Terror',
                year: '2016',
                cover: 'https://es.hollywoodreporter.com/wp-content/uploads/2025/10/Esto-es-todo-lo-que-sabemos-sobre-la-ultima-temporada-de-Stranger-Things.jpg',
                description: 'Uma carta de amor aos clássicos sobrenaturais dos anos 80, Stranger Things é a história de um menino que desaparece e de uma cidade que descobre segredos sombrios.',
                ageRating: '14',
                ratings: { imdb: 8.7, rottenTomatoes: 91, metascore: 78 },
                isHero: true,
                seasons: {
                    1: [
                        { title: "O desaparecimento de Will Byers", url: "https://drive.google.com/file/d/1jA0SUmrcvDJSRxTPWRkCh__yPxGXKs2Q/preview" },
                        { title: "A estranha da Maple Street", url: "https://drive.google.com/file/d/1pglYy77Xa8o0dYr0frDST_wtceovJKB6/preview" },
                        { title: "Caramba", url: "https://drive.google.com/file/d/1E9BmsgTCviJGsazvx_q0D_qNng1k2Cop/preview" },
                        { title: "O corpo", url: "https://drive.google.com/file/d/1APURKFILNPvNGAT5Z18Zs2YtNdpnhwWL/preview" },
                        { title: "A pulga e o acrobata", url: "https://drive.google.com/file/d/1UIRAu43z4qHuTtWxPDvs03mq61OjWpJh/preview" },
                        { title: "O monstro", url: "https://drive.google.com/file/d/1QQQfaiAdD7inyyRgjWeAnzxKDtxaQmU6/preview" },
                        { title: "A banheira", url: "https://drive.google.com/file/d/1Nr7BB5TZMUN8FJQJk5Eu81Nz32Ijj9-M/preview" },
                        { title: "De ponta-cabeça", url: "https://drive.google.com/file/d/1lt6WZmAHr40_ofQ3YI0Ir0WqONMt3sxp/preview" }
                    ],
                    2: [
                        { title: "Mad Max", url: "https://drive.google.com/file/d/1vWObqz3txFCkAsmlF6rP0hnkLXQdYNTg/preview" },
                        { title: "Gostosura ou travessura", url: "https://drive.google.com/file/d/15LkiyN-XNsKTsKuIinx1lxGEJ6atqEB3/preview" },
                        { title: "O girino", url: "https://drive.google.com/file/d/1aOYmRWV7aAiuDm7F-L8d2nWPXsnK3u2N/preview" },
                        { title: "Will, o sábio", url: "https://drive.google.com/file/d/1EbN2px12MOdlv8t3bG1lzW8CHKX19S3f/preview" },
                        { title: "Dig Dug", url: "https://drive.google.com/file/d/15RS3bamEfRrHxtUgOPgrPbjWQnGCs9K3/preview" },
                        { title: "O espião", url: "https://drive.google.com/file/d/1eftQ6iiGIegch1OxNC8g_impKYvdvMsx/preview" },
                        { title: "A irmã perdida", url: "https://drive.google.com/file/d/14go4_qruYL5gVU5MWzwmeLzNR8rFGRrB/preview" },
                        { title: "O Devorador de Mentes", url: "https://drive.google.com/file/d/1hsJCe8ryMDaz5iHMxF5i9UvRGRJp51gc/preview" },
                        { title: "O portal", url: "https://drive.google.com/file/d/1KGNzD6d4sLvhpsT0xGGF9Z8gEesGtPFD/preview" }
                    ],
                    3: [
                        { title: "Está me ouvindo, Suzie?", url: "https://drive.google.com/file/d/1XfzDMa5UUXTEGYI7rRor16xMLqns21-S/preview" },
                        { title: "O caso dos ratos", url: "https://drive.google.com/file/d/1uDZAS0aOjS-bQipiFiGYG0X2zK1Bc3Jt/preview" },
                        { title: "A salva-vidas desaparecida", url: "https://drive.google.com/file/d/1VpRDqWLTi4QsU01GcNxJrwmKP5MS6Lo5/preview" },
                        { title: "A prova da sauna", url: "https://drive.google.com/file/d/1IVZ1hfGl8YIeTfGQO5Jp3DJd4jVQeDmj/preview" },
                        { title: "Os devorados", url: "https://drive.google.com/file/d/1SVXkvGOx2HMa8iS5WCRY8PuoQSA8J6YK/preview" },
                        { title: "E pluribus unum", url: "https://drive.google.com/file/d/1uam4RJCEYkFGtyinYJ8Ljo-JkHIpSLc1/preview" },
                        { title: "A mordida", url: "https://drive.google.com/file/d/1JiRmtEHXa83vleGIBTv-1yg_OCIYZaCW/preview" },
                        { title: "A batalha de Starcourt", url: "https://drive.google.com/file/d/1_F6_qA9MtI7SR9mr3C4CW-wen5i9yu6u/preview" }
                    ],
                    4: [
                        { title: "O Clube Hellfire", url: "https://drive.google.com/file/d/1ZDiFOud9zBnrsegnKCo1oEoW6iBbzCS2/preview" },
                        { title: "A maldição de Vecna", url: "https://drive.google.com/file/d/1BLh9YesJz1mWYZxFw-EjVM0BRulY305u/preview" },
                        { title: "O monstro e a super-heroína", url: "https://drive.google.com/file/d/17d7rivkMsdtf8l500URgQGdvMaggSS1k/preview" },
                        { title: "Querido Billy", url: "https://drive.google.com/file/d/1z_rVv032G7-UXqb45OCtNLpDkVG8Kpq/preview" },
                        { title: "Projeto Nina", url: "https://drive.google.com/file/d/1OD2KvUHg_9xWMWkbAdh__w5Dau8JFUTS/preview" },
                        { title: "Mergulho", url: "https://drive.google.com/file/d/1WegNowrQi1EsSQZO7Uz_A3GowbBfH9FO/preview" },
                        { title: "O massacre no laboratório", url: "https://drive.google.com/file/d/1ipI0psTtKFSw6OcoQiXvFot2koGJW2W0/preview" },
                        { title: "Papai", url: "https://drive.google.com/file/d/16NS_DpktJW4a7M9aqflF9m7Iv3Z4z0LJ/preview" },
                        { title: "E o plano de Onze", url: "https://drive.google.com/file/d/1i_qekb-WZTIkkFlRM36FIjHKPjfTZ3Y6/preview" }
                    ],
                    5: [
                        { title: "Missão de resgate", url: "https://drive.google.com/file/d/1xFrwPesQ0zXWoRsBaL9ZIDTPnvVSkkuF/preview" },
                        { title: "O desaparecimento de Holly Wheeler", url: "https://drive.google.com/file/d/1f7j3ma94atswrsZV9-uSiqPLNeixHrC/preview" },
                        { title: "A armadilha", url: "https://drive.google.com/file/d/1Um1zw_iXsah4kh3AzDBSOuMek6kbZxI2/preview" },
                        { title: "Feiticeiro", url: "https://drive.google.com/file/d/1_dBex9phSWyauWp1eoFoRx9AN9i31dPA/preview" },
                        { title: "Tratamento de choque", url: "https://drive.google.com/file/d/1wvZIvfHngKO8b7yurLrDsPIzX3ijLZHE/preview" },
                        { title: "A fuga de Camazotz", url: "https://drive.google.com/file/d/15J4JKrp2BVQQCdoQcHU_JnYHOzdNd3qJ/preview" },
                        { title: "A ponte", url: "https://drive.google.com/file/d/1OzFsVQtKLWbAiXQgF1iGiTzSGuuPRFX0/preview" },
                        { title: "O mundo direito", url: "https://drive.google.com/file/d/1XSlN4w9H4jsas08jGrMhthBHspHNm3QS/preview" }
                    ]
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
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/52txzjif5aydz9lhm0jpo/Divertida-Mente-2.mp4?rlkey=0qb4kpi7tlecwiu0oxngoxt0f&st=jv5n3jij'
            },
            {
                id: 'miraculous-ladybug',
                title: 'Miraculous: As Aventuras de Ladybug',
                originalTitle: 'Miraculous: Tales of Ladybug & Cat Noir',
                type: 'serie',
                category: 'Animação, Ação, Aventura, Romance, Super-herói, Fantasia',
                year: '2015',
                cover: 'https://variety.com/wp-content/uploads/2026/01/Ladybug-and-Cat-Noir.jpg',
                description: 'Em Paris, dois adolescentes levam vidas aparentemente comuns; quando o perigo surge, eles se transformam em Ladybug e Chat Noir para proteger a cidade do vilão Hawk Moth.',
                ageRating: 'L',
                producer: 'Miraculous Corp.',
                creator: 'Thomas Astruc',
                nextEpisodeTrigger: 17,
                seasons: {
                    1: [
                        { id: 's1-e1', title: 'Ladybug & Chat Noir (Origens – Parte 1)', url: 'https://youtu.be/wJRoIWMqFzk' },
                        { id: 's1-e2', title: 'Coração de Pedra (Origens – Parte 2)', url: 'https://youtu.be/InghZwLBmtM' },
                        { id: 's1-e3', title: 'Faraó', url: 'https://youtu.be/LFrToaQq8wE' },
                        { id: 's1-e4', title: 'Tormenta', url: 'https://youtu.be/-fnCpi_hvbY' },
                        { id: 's1-e5', title: 'Homem-Bolha', url: 'https://youtu.be/6svrrMKxFCA' },
                        { id: 's1-e6', title: 'Lady Wifi', url: 'https://youtu.be/dstJldFauxM' },
                        { id: 's1-e7', title: 'O Mímico', url: 'https://youtu.be/6QCST9L11ik' },
                        { id: 's1-e8', title: 'O Ilustrador do Mal', url: 'https://youtu.be/YFrXGsdXNjM' },
                        { id: 's1-e9', title: 'Sr. Pombo', url: 'https://youtu.be/rikfWmYC13w' },
                        { id: 's1-e10', title: 'Rogercop', url: 'https://youtu.be/9vq5R6HbLoE' },
                        { id: 's1-e11', title: 'A Marionetista', url: 'https://youtu.be/6sDNTaJOhPY' },
                        { id: 's1-e12', title: 'Animan', url: 'https://youtu.be/svmISovrbt4' },
                        { id: 's1-e13', title: 'Reflekta', url: 'https://youtu.be/RlPxWCH-mhM' },
                        { id: 's1-e14', title: 'Copycat', url: 'https://youtu.be/xW-V6akY5-I' },
                        { id: 's1-e15', title: 'Cupido Negro', url: 'https://youtu.be/asIGy1F6oYc' },
                        { id: 's1-e16', title: 'Pixelador', url: 'https://youtu.be/Rqj3yUIqnX4' },
                        { id: 's1-e17', title: 'Lâmina Negra', url: 'https://youtu.be/UPtRLc8Oy5k' },
                        { id: 's1-e18', title: 'Guitarrista Malvado', url: 'https://youtu.be/eob6ibvIExc' },
                        { id: 's1-e19', title: 'Temporizadora', url: 'https://youtu.be/bHgFWp4x_Ws' },
                        { id: 's1-e20', title: 'Antibug', url: 'https://youtu.be/ItPsHq4I5mQ' },
                        { id: 's1-e21', title: 'Jogador', url: 'https://youtu.be/cgZwRXyVqFM' },
                        { id: 's1-e22', title: 'Horrificador', url: 'https://atto.videonest.co/901bacc5-dc80-4434-a971-3f239e555775_video_v2.mp4' },
                        { id: 's1-e23', title: 'Kung Food', url: 'https://youtu.be/uoGPBey14t0' },
                        { id: 's1-e24', title: 'Princesa Perfume', url: 'https://youtu.be/WYez7EkJuZI' },
                        { id: 's1-e25', title: 'Simon Mandou', url: 'https://youtu.be/0FBBdEYoA-Q' },
                        { id: 's1-e26', title: 'Volpina', url: 'https://youtu.be/lgIdSYbDF-E' }
                    ],
                    2: [
                        { id: 's2-e1', title: 'Ladybug e o Natal', url: 'https://youtu.be/oqEBA1bQz58' },            // Papai Cruel akumatizado
                        { id: 's2-e2', title: 'O Colecionador', url: 'https://youtu.be/L3qmxWEH_M4' },          // Gabriel Agreste akumatizado
                        { id: 's2-e3', title: 'Rainha Repórter', url: 'https://youtu.be/xj-hE-N19Vg' },         // Nadia Chamack akumatizada
                        { id: 's2-e4', title: 'O Urso Maligno', url: 'https://youtu.be/rcp0QJPjvok' },         // mordomo de Chloé akumatizado
                        { id: 's2-e5', title: 'Revanche', url: 'https://youtu.be/6wOfZqbSIPY' },               // esgrimista akumatizada
                        { id: 's2-e6', title: 'Befana', url: 'https://youtu.be/R0anL3UERkQ' },                // avó de Marinette akumatizada
                        { id: 's2-e7', title: 'Robustus', url: 'https://youtu.be/LBrT1TwKyd4' },               // robô Markov ganha vida a objetos
                        { id: 's2-e8', title: 'Gigantitan', url: 'https://youtu.be/FfX-ilFPdBc' },             // bebê gigante causa destruição
                        { id: 's2-e9', title: 'Coruja Negra', url: 'https://youtu.be/rt9E-wsuHi4' },           // diretor da escola vira vilão tecnológico
                        { id: 's2-e10', title: 'Sapotis', url: 'https://youtu.be/XsSb7TlAmaw' },               // irmãs de Alya viram pequenos monstros
                        { id: 's2-e11', title: 'Glaciator', url: 'https://youtu.be/raAUdHhCBg8' },             // sorveteiro transforma pessoas em sorvete
                        { id: 's2-e12', title: 'Gorizilla', url: 'https://youtu.be/p4sphYgxWOI' },             // segurança de Adrien ganha força
                        { id: 's2-e13', title: 'Capitã Hardrock', url: 'https://youtu.be/geJ7G1DTx7k' },       // mãe de Juleka quer espalhar música
                        { id: 's2-e14', title: 'Zombizou', url: 'https://youtu.be/jxbDgLUSISM' },              // senhorita Bustier espalha "amor" à força
                        { id: 's2-e15', title: 'A Sereia', url: 'https://youtu.be/UxZ-kB7gdl4' },              // Ondine tenta transformar Paris em reino submarino
                        { id: 's2-e16', title: 'A Cantora', url: 'https://youtu.be/FiYW8LfeO-k' },            // cantora transforma Paris em musical
                        { id: 's2-e17', title: 'Encrenqueira', url: 'https://youtu.be/UrthqsGPctc' },         // assistente de Jagged Stone causa conflitos
                        { id: 's2-e18', title: 'Frozer', url: 'https://youtu.be/wePFYrN_IOk' },               // instrutor de patinação cria reino de gelo
                        { id: 's2-e19', title: 'Rainha da Moda (A Batalha das Rainhas – Parte 1)', url: 'https://youtu.be/RNlrL37_fe8' },
                        { id: 's2-e20', title: 'Rainha Vespa (A Batalha das Rainhas – Parte 2)', url: 'https://youtu.be/W5gBDxUdr-Q' },
                        { id: 's2-e21', title: 'O Reverso', url: 'https://youtu.be/H5r5NxTwVBo' },             // Marc vira Reverso
                        { id: 's2-e22', title: 'Anansi', url: 'https://youtu.be/SmAguUKI7oM' },               // Nora vira aranha gigante
                        { id: 's2-e23', title: 'O Ditador', url: 'https://youtu.be/k1XpqJOtLyQ' },            // pai de Chloé vira Ditador
                        { id: 's2-e24', title: 'Sonhador', url: 'https://youtu.be/8L3MhxSSgOU' },             // vilão transforma pesadelos em realidade
                        { id: 's2-e25', title: 'Catalyst (Dia dos Heróis – Parte 1)', url: 'https://youtu.be/4gdvXNoj3s0' },
                        { id: 's2-e26', title: 'Mayura (Dia dos Heróis – Parte 2)', url: 'https://youtu.be/ud6Q7FHz_Ao' }
                    ],
                    3: [
                        { id: 's3-e1', title: 'Camaleoa', url: 'https://youtu.be/6s1zlQ42Big' },
                        { id: 's3-e2', title: 'Animaestro', url: 'https://youtu.be/pUOqMpu3m0c' },
                        { id: 's3-e3', title: 'Bakerix', url: 'https://player.odycdn.com/v6/streams/37a07e649aa64a5b02c98220143ddd3b89697e85/5e486f.mp4' },
                        { id: 's3-e4', title: 'Regressa', url: 'https://youtu.be/xokef5ZI_xA' },
                        { id: 's3-e5', title: 'Reflekdoll', url: 'https://youtu.be/bWdwJk39Xog' },
                        { id: 's3-e6', title: 'Lobipai', url: 'https://youtu.be/mozKJ6o69H0' },
                        { id: 's3-e7', title: 'Silenciador', url: 'https://youtu.be/2AivRS8TVmU' },
                        { id: 's3-e8', title: 'Oni-Chan', url: 'https://youtu.be/_2G7ZCLsUMo' },
                        { id: 's3-e9', title: 'Miraculer', url: 'https://youtu.be/E_p_CfK6c3s' },
                        { id: 's3-e10', title: 'Oblívio', url: 'https://youtu.be/U24d0W9siUE' },
                        { id: 's3-e11', title: 'Desperada', url: 'https://youtu.be/Cc7TecjN-ms' },
                        { id: 's3-e12', title: 'Chris Master', url: 'https://youtu.be/axxX95fkOFM' },
                        { id: 's3-e13', title: 'Startrain', url: 'https://youtu.be/P55uLPl8GO4' },
                        { id: 's3-e14', title: 'Caçadora de Kwamis', url: 'https://youtu.be/ZZBAmdQZ11k' },
                        { id: 's3-e15', title: 'Faminto', url: 'https://youtu.be/uH8we9r8O6E' },
                        { id: 's3-e16', title: 'Jogador 2.0', url: 'https://youtu.be/et2FJx44iAA' },
                        { id: 's3-e17', title: 'Tormenta 2', url: 'https://youtu.be/ifGgRNEYh1o' },
                        { id: 's3-e18', title: 'Ikari Gozen', url: 'https://youtu.be/updsSEVsJ14' },
                        { id: 's3-e19', title: 'Tagueador do Tempo', url: 'https://youtu.be/6YPmN56to9M' },
                        { id: 's3-e20', title: 'O Penetra', url: 'https://youtu.be/YDxyrW4WEuM' },
                        { id: 's3-e21', title: 'A Marionetista 2', url: 'https://youtu.be/IUrjs2C5RaE' },
                        { id: 's3-e22', title: 'Chat Blanc', url: 'https://youtu.be/EB-LcdyOQEI' },
                        { id: 's3-e23', title: 'Félix', url: 'https://youtu.be/Xb9ED3nJHNQ' },
                        { id: 's3-e24', title: 'Ladybug', url: 'https://youtu.be/w9eWy5Ujqlg' },
                        { id: 's3-e25', title: 'Heart Hunter (Batalha dos Miraculous – Parte 1)', url: 'https://youtu.be/8Xe-ebCxRr4' },
                        { id: 's3-e26', title: 'Miracle Queen (Batalha dos Miraculous – Parte 2)', url: 'https://youtu.be/i0bZ6MNGZ1g' }
                    ],
                    4: [
                        { id: 's4-e1', title: 'Verdade', url: 'https://youtu.be/zzP2jph04HA' },
                        { id: 's4-e2', title: 'Mentira', url: 'https://youtu.be/JaVlS4nEHa4' },
                        { id: 's4-e3', title: 'Gangue dos Segredos', url: 'https://youtu.be/VQkSeRVnjDI' },
                        { id: 's4-e4', title: 'Sr. Pombo 72', url: 'https://youtu.be/IQebuDqyG1w' },
                        { id: 's4-e5', title: 'Psicomédia', url: 'https://youtu.be/lvWBbKPVzXA' },
                        { id: 's4-e6', title: 'Furioso Fu', url: 'https://youtu.be/U8LL3k1YICQ' },
                        { id: 's4-e7', title: 'Esmagadora', url: 'https://youtu.be/V-VmOSPsO2A' },
                        { id: 's4-e8', title: 'Rainha Banana', url: 'https://youtu.be/SnBzCZiRcyA' },
                        { id: 's4-e9', title: 'Gabriel Agreste', url: 'https://youtu.be/b2F_0Ycnq6c' },
                        { id: 's4-e10', title: 'Sanguessuga', url: 'https://youtu.be/adMVyNzJBxQ' },
                        { id: 's4-e11', title: 'Remorso', url: 'https://youtu.be/bhLcRz2GZoA' },
                        { id: 's4-e12', title: 'Crocoduel', url: 'https://youtu.be/RV3jAYivLjU' },
                        { id: 's4-e13', title: 'Optigami', url: 'https://youtu.be/JIk6c1mwSgc' },
                        { id: 's4-e14', title: 'Sentibolha', url: 'https://youtu.be/pHU7wqiQlfQ' },
                        { id: 's4-e15', title: 'Glaciator 2', url: 'https://youtu.be/KVWkjK1kjVY' },
                        { id: 's4-e16', title: 'Hack-San', url: 'https://youtu.be/Yd58pUFbcww' },
                        { id: 's4-e17', title: 'Lastimador', url: 'https://youtu.be/PqwdBuCGgS4' },
                        { id: 's4-e18', title: 'Realizador de Sonhos', url: 'https://youtu.be/dyojeBhBaIM' },
                        { id: 's4-e19', title: 'Simplificador', url: 'https://youtu.be/FWs094wFIG8' },
                        { id: 's4-e20', title: 'Qilin', url: 'https://youtu.be/KnUD1MgsoZ8' },
                        { id: 's4-e21', title: 'Família Querida', url: 'https://youtu.be/RgVipU06vvk' },
                        { id: 's4-e22', title: 'Efêmero', url: 'https://youtu.be/ek4Dak0CZKg' },
                        { id: 's4-e23', title: 'Kuro Neko', url: 'https://youtu.be/TcS37w9p66s' },
                        { id: 's4-e24', title: 'Penalteam', url: 'https://youtu.be/EPXpQFFyfQo' },
                        { id: 's4-e25', title: 'Risco (O Ataque Final de Shadow Moth – Parte 1)', url: 'https://youtu.be/aMidvMvgEw4' },
                        { id: 's4-e26', title: 'Contra-Ataque (O Ataque Final de Shadow Moth – Parte 2)', url: 'https://youtu.be/YJk0BkSrZmY' }
                    ],
                    5: [
                        { id: 's5-e1', title: 'Evolução', url: 'https://player.odycdn.com/api/v3/streams/free/501/b4f4c2372787f76f7de0e022935f7b69aba5f037/754df5.mp4' },
                        { id: 's5-e2', title: 'Multiplicação', url: 'https://player.odycdn.com/v6/streams/e5ef9809aa22f2e63ba391bf5612261761ddfcc7/36d697.mp4' },
                        { id: 's5-e3', title: 'Destruição', url: 'https://player.odycdn.com/v6/streams/7c7b19f641d4bb327d8489295e1f21972a07e276/a2c2d8.mp4' },
                        { id: 's5-e4', title: 'Júbilo', url: 'https://player.odycdn.com/v6/streams/5752309f039f7a08eb735e51621bc37918c60b6c/e67b7f.mp4' },
                        { id: 's5-e5', title: 'Ilusão', url: 'https://player.odycdn.com/v6/streams/94ac8eaf3f59cabfa707c25f974c1ee4aeb93b3d/81bd4a.mp4' },
                        { id: 's5-e6', title: 'Determinação', url: 'https://player.odycdn.com/v6/streams/2438c2d449600106ebbc48ad19c2c68555b2c907/78ccf8.mp4' },
                        { id: 's5-e7', title: 'Paixão', url: 'https://player.odycdn.com/v6/streams/f98cd4225e4ee62dcdb42a51d369fadd9090c79b/9ad282.mp4' },
                        { id: 's5-e8', title: 'Reunião', url: 'https://player.odycdn.com/v6/streams/23aab3cef376de34a0e13f5e8c92bdaea891e492/7af521.mp4' },
                        { id: 's5-e9', title: 'Colisão', url: 'https://player.odycdn.com/v6/streams/83f2d27425d5faf018bd6d8642d8efa489c4d1c2/128754.mp4' },
                        { id: 's5-e10', title: 'Transmissão (A Escolha dos Kwamis - Parte 1)', url: 'https://player.odycdn.com/v6/streams/c2c81c975a0d9007c22a49c7f0fd91dcdac887b0/a643e8.mp4' },
                        { id: 's5-e11', title: 'Deflagração (A Escolha dos Kwamis - Parte 2)', url: 'https://player.odycdn.com/v6/streams/07d51ee63b85153fb7dc70dadfc6c669a4fd5442/18e8d2.mp4' },
                        { id: 's5-e12', title: 'Perfeição', url: 'https://player.odycdn.com/v6/streams/db3a96f84022de50249ccb9d7baac385130cc629/e1c741.mp4' },
                        { id: 's5-e13', title: 'Migração', url: 'https://player.odycdn.com/v6/streams/d969d592c75ad686937bd45e2489b662b27d179e/7a0324.mp4' },
                        { id: 's5-e14', title: 'Zombaria', url: 'https://player.odycdn.com/v6/streams/2b94a722fef77f944ed7e0cc8c93a39095158204/95e199.mp4' },
                        { id: 's5-e15', title: 'Intuição', url: 'https://player.odycdn.com/v6/streams/12573afa6ef0468b5331d19fc011803b8d566744/c59e0c.mp4' },
                        { id: 's5-e16', title: 'Proteção', url: 'https://player.odycdn.com/v6/streams/14715a5fed10cdb0605c33e8fb587e0e052a91b6/8dd025.mp4' },
                        { id: 's5-e17', title: 'Adoração', url: 'https://player.odycdn.com/v6/streams/df596225b7de2b0c374a23144bf247cd6b49f19d/87700d.mp4' },
                        { id: 's5-e18', title: 'Emoção', url: 'https://player.odycdn.com/v6/streams/4a4aa4cb067d60604ad9019bbcdd004c22973b98/fe5ba5.mp4' },
                        { id: 's5-e19', title: 'Pretensão', url: 'https://player.odycdn.com/v6/streams/e2d0645f4adafb586edfd8e60cd1f280d0cfc64a/0541a3.mp4' },
                        { id: 's5-e20', title: 'Revelação', url: 'https://player.odycdn.com/v6/streams/03da70153bd4d7b300a9b02e29b3770cc592f627/45521d.mp4' },
                        { id: 's5-e21', title: 'Confrontação', url: 'https://player.odycdn.com/v6/streams/31079071c533832083538aeb3b68d62c7d6feb6d/2dc90e.mp4' },
                        { id: 's5-e22', title: 'Conspiração', url: 'https://player.odycdn.com/v6/streams/c76eeb01c46ffd52641c8c2f6395f9ee41d9bbee/1d51bf.mp4' },
                        { id: 's5-e23', title: 'Revolução', url: 'https://player.odycdn.com/v6/streams/ff829085282ba4ddf61067e66a207be55e204f46/ddd5ad.mp4' },
                        { id: 's5-e24', title: 'Representação', url: 'https://player.odycdn.com/v6/streams/607f2d87d62c2374bf79bce2687cdb174ffba9f0/cd2335.mp4' },
                        { id: 's5-e25', title: 'Conformação (O Último Dia - Parte 1)', url: 'https://player.odycdn.com/v6/streams/11d9b36957e46e52b9bc15ed32be268ba20cea5c/11597f.mp4' },
                        { id: 's5-e26', title: 'Re-Criação (O Último Dia - Parte 2)', url: 'https://player.odycdn.com/v6/streams/11d9b36957e46e52b9bc15ed32be268ba20cea5c/11597f.mp4' },
                        { id: 's5-e27', title: 'Ação', url: 'https://player.odycdn.com/v6/streams/dbf0ec1dbd1ace2a2d4cc1953891809f1e380c7d/1f6242.mp4' }
                    ],
                    6: [
                        { id: 's6-e1', title: 'Rainha Tormenta', url: 'https://player.odycdn.com/v6/streams/d8b5e5bc0a632e71d7a9b9b2483b85dfb28e3c1b/3bc0ee.mp4' },
                        { id: 's6-e2', title: 'A Desenhista', url: 'https://player.odycdn.com/v6/streams/416f183131badab98d836cba6594cb9b53bdf2b5/834dda.mp4' },
                        { id: 's6-e3', title: 'Sublimação', url: 'https://player.odycdn.com/v6/streams/96e76638e6737cc9b42440db68bf2408ac10fb4f/6456af.mp4' },
                        { id: 's6-e4', title: 'Papaicop', url: 'https://player.odycdn.com/v6/streams/9eecb2249fb5fac9b10cfd1cef2eb8dcf47b2180/e9ec5a.mp4' },
                        { id: 's6-e5', title: 'Lobisavôs', url: 'https://player.odycdn.com/v6/streams/92469e601361935196c9bdbaee79d52075200fe9/96bc73.mp4' },
                        { id: 's6-e6', title: 'Sereia Adormecida', url: 'https://player.odycdn.com/v6/streams/a0ac8523a13c388014141282e4af992525edb510/2b11bd.mp4' },
                        { id: 's6-e7', title: 'El Toro de Piedra', url: 'https://player.odycdn.com/api/v3/streams/free/607/6240e8646308bf3f7c886be07bfe21d0834d24c8/8ccfbf.mp4' },
                        { id: 's6-e8', title: 'Vampigami', url: 'https://player.odycdn.com/v6/streams/66a5821532656c5d644f8e548cab4831cc52d731/5dfefd.mp4' },
                        { id: 's6-e9', title: 'Senhor Agreste', url: 'https://player.odycdn.com/api/v3/streams/free/609/d4573facf84ad62e31d1cc598a27abe060063905/2b0cf0.mp4' },
                        { id: 's6-e10', title: 'O Castelo Sombrio', url: 'https://player.odycdn.com/api/v3/streams/free/610/35b3b83495bab41e230b45e95c93a844ac9770c0/4a6304.mp4' },
                        { id: 's6-e11', title: 'Revelador', url: 'https://player.odycdn.com/api/v3/streams/free/611/1b3122e75cbfe7b4abb215386ef92425cf8a60e3/8f6913.mp4' },
                        { id: 's6-e12', title: 'Doutora Psicopiloto', url: 'https://player.odycdn.com/api/v3/streams/free/612/7b38337d849551dad44a7e11066c3160e9c4da0e/4954bb.mp4' },
                        { id: 's6-e13', title: 'Yaksi Gozen', url: 'https://player.odycdn.com/v6/streams/c4fcf17fe01404da2134c862c68af3329f6b652e/805855.mp4' },
                        { id: 's6-e14', title: 'Fraldizer', url: 'https://player.odycdn.com/api/v3/streams/free/tetec/6487d54609e360c47f9e7175f87e835a2e7982be/8f68cd.mp4' },
                        { id: 's6-e15', title: 'A Alinhadora', url: 'https://player.odycdn.com/api/v3/streams/free/615/ed1e46dbe9e3303e6a5c3ba72ed6e81596da7983/51a335.mp4' },
                        { id: 's6-e16', title: 'Noe', url: 'https://player.odycdn.com/v6/streams/9cede011109fb452793f589640917b00cfa1e9a3/685cbb.mp4' },
                        { id: 's6-e17', title: 'A Fada dos Belos Sonhos', url: 'https://player.odycdn.com/v6/streams/f504e216caeaeb948477d1e3dbc4306467722aa5/391e77.mp4' },
                        { id: 's6-e18', title: 'Os Quebra-Catástrofes', url: '' },
                        { id: 's6-e19', title: 'Regeneração', url: '' },
                        { id: 's6-e20', title: 'Inverte-Corações', url: '' },
                        { id: 's6-e21', title: 'Os Titãs da Corrente', url: '' },
                        { id: 's6-e22', title: 'Lady Caos', url: '' },
                        { id: 's6-e23', title: 'Tristanansi', url: '' },
                        { id: 's6-e24', title: 'A Rainha da Terra do Medo', url: '' },
                        { id: 's6-e25', title: 'Protocolo Secreto', url: '' },
                        { id: 's6-e26', title: 'Nêmesis', url: '' }
                    ]
                }
            },
            {
                id: 'miraculous-movie-2023',
                title: 'Miraculous: O Filme',
                originalTitle: 'Miraculous: Ladybug & Cat Noir – O Filme',
                type: 'filme',
                category: 'Animação, Aventura, Fantasia, Romance, Musical',
                year: '2023',
                cover: 'https://s2-techtudo.glbimg.com/DQjuP86D9Vfv-3xbQWWxYTgo9NY=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/8/8/RVYTZeQ12d1q6fTA5X1A/lb.jpg',
                description: 'Marinette descobre seus poderes como Ladybug e, ao lado de Cat Noir, precisa enfrentar Hawk Moth para salvar Paris, enquanto lida com sentimentos, inseguranças e sua vida dupla como heroína.',
                ageRating: 'L',
                distributor: 'Netflix (BR)',
                producer: 'ZAG / ON Animation Studios',
                yearBR: '2023',
                tags: ['Lançamento','Popular'],
                url: 'https://player.odycdn.com/v6/streams/dc5cefe67d37355a86a67c2a718b29ae697a0097/23dc2c.mp4'
            },
            {
                id: 'miraculous-world-ny',
                title: 'Miraculous World: Nova Iorque, Heróis Unidos',
                originalTitle: 'Miraculous World: New York, United Heroes',
                type: 'filme',
                category: 'Animação, Aventura, Ação, Família, Fantasia',
                year: '2020',
                cover: 'https://is1-ssl.mzstatic.com/image/thumb/XiUWuYx6x9I7r91sqitGfA/1200x675.jpg',
                description: 'Marinette e sua turma viajam para Nova York durante a Semana da Amizade Franco-Americana. Quando um poderoso colar está na mira do vilão Falcão-Traça, Ladybug e Cat Noir precisam unir forças com super-heróis americanos para proteger a cidade que nunca dorme.',
                ageRating: 'L',
                distributor: 'ZAG Inc. / Method Animation',
                producer: 'ZAG Inc.',
                creator: 'Thomas Astruc',
                url: 'https://youtu.be/SYtfrnK8BJ0'
            },

            {
                id: 'miraculous-world-shanghai',
                title: 'Miraculous World: Shanghai – A Lenda de Ladydragon',
                originalTitle: 'Miraculous World: Shanghai – The Legend of Ladydragon',
                type: 'filme',
                category: 'Animação, Aventura, Ação, Fantasia, Família',
                year: '2021',
                cover: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSjTXplmwAa0G7UWeG2IBl4bBFAJtZlHUasHbUCWfagAmQt6vrOKLSu-ig5TGC55GiASuukiKPaNkSoTlF6LZQhbR-NVUofMvN0S.jpg?r=831',
                description: 'Durante as férias escolares, Marinette viaja para Xangai para encontrar Adrien e visitar seu tio, mas tem seus pertences roubados — incluindo seu Miraculous e Tikki — e precisa unir forças com uma nova amiga para recuperar tudo e enfrentar desafios na grande metrópole chinesa.',
                ageRating: 'L',
                distributor: 'ZAG Inc. / Method Animation',
                producer: 'ZAG Inc.',
                year: '2021',
                url: 'https://player.odycdn.com/v6/streams/f77cdc0de3c6f736172dbdfe369a1d823b9012dc/12c596.mp4'
            },
            {
                id: 'miraculous-world-paris',
                title: 'Miraculous World: Paris, As Aventuras de Shadybug e Claw Noir',
                originalTitle: 'Miraculous World: Paris — Shadybug & Claw Noir Adventures',
                type: 'filme',
                category: 'Animação, Ação, Aventura, Fantasia, Super-herói',
                year: '2023',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/bf62c0026df57bf9515f89ef8b5c353b25109fab7ebb7727c6308db9f5d19342.png',
                description: 'Ladybug e Gato Noir descobrem que, em um universo paralelo, suas versões — Shadybug e Claw Noir — são vilões determinados a conseguir o Miraculous da Borboleta; para ajudar o herói daquele mundo, eles enfrentam seus contrapartes malignos e tentam fazê-los escolher o caminho do bem.',
                ageRating: 'L',
                distributor: 'ZAG Inc. / Method Animation',
                producer: 'ZAG Inc.',
                year: '2023',
                url: 'https://player.odycdn.com/v6/streams/44a39e5995f122b6ddbf7fd1ba3ebfeaf65f666c/233934.mp4'
            },
            {
                id: 'miraculous-world-london',
                title: 'Miraculous World: Londres - Corrida Contra o Tempo',
                originalTitle: 'Miraculous World: London - At the Edge of Time',
                type: 'filme',
                category: 'Animação, Ação, Aventura, Fantasia, Heróis',
                year: '2024',
                cover: 'https://i.ibb.co/g6KDj3y/IMG-20240919-112219-448.jpg',
                description: 'Para proteger o futuro, Marinette, agora transformada em Chronobug, une-se à Bunnyx para enfrentar um novo vilão que viaja no tempo e pretende revelar a identidade secreta de Ladybug. Juntas, elas precisam impedir que o tempo seja destruído e que Ladybug deixe de existir.',
                ageRating: 'L',
                distributor: 'ZAG Inc. / Method Animation / Disney Channel / Disney+',
                producer: 'ZAG Inc.',
                url: 'https://player.odycdn.com/v6/streams/d94d7169bf1198cbc40d25f614d01a618813ced8/f2fb22.mp4'
            },
            {
                id: 'miraculous-world-tokyo',
                title: 'Miraculous World - Tóquio: Força Estelar',
                originalTitle: 'Miraculous World: Tokyo – Stellar Force',
                type: 'filme',
                category: 'Ação, Aventura, Animação, Heroicos, Fantasia',
                year: '2025',
                cover: 'https://i.ibb.co/p6tQ0W5W/20251005-100127.jpg',
                description: 'Quando Ladybug viaja até Tóquio para ajudar sua amiga Kagami, elas enfrentam um novo vilão misterioso que transforma civis em monstros kaiju; juntas com os heróis japoneses conhecidos como Tokyo Stellar Force, precisam unir forças para salvar a cidade e descobrir mais sobre o passado de Kagami.',
                ageRating: 'L',
                distributor: 'Disney Channel / Disney Branded Television',
                producer: 'Disney Branded Television',
                url: 'https://player.odycdn.com/v6/streams/4714c84f525eaa3163672991d61b84784bfbf1af/04cd32.mp4'
            },

            {
                id: 'zombies-4',
                title: 'Zombies 4: A Era dos Vampiros',
                type: 'filme',
                category: 'Musical / Aventura / Comédia / Família / Romance',
                year: '2025',
                cover: 'https://cadernopop.com.br/wp-content/uploads/2025/07/Zombies-4-A-Era-dos-Vampiros-1024x575.webp',
                description: 'Zed e Addison embarcam em uma viagem de verão que os leva a um acampamento onde surge um conflito entre Daywalkers e Vampiros. Para evitar uma nova guerra, eles precisam unir os grupos e manter a paz.',
                ageRating: 'L',
                distributor: 'Disney Channel',
                production: 'Disney Branded Television',
                productionNote: 'Distribuidora / Publicadora: Disney Branded Television / Disney Channel',
                cast: ['Zed','Addison'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/2gnl6j49cuf48fyhvo5m1/Zombies.4.mp4?rlkey=0j73q1s00bjdbeauifx3tjgcg&st=r7gwga4f'
            },
            {
                id: 'zombies',
                title: 'Zombies',
                originalTitle: 'Zombies',
                type: 'filme',
                category: 'Musical / Romance / Comédia / Fantasia / Família',
                year: '2018',
                yearBR: '2018',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/b07f1003-36cc-4ba3-a0f2-2f960206c86f/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Em uma cidade onde humanos e zumbis vivem separados, Zed, um zumbi, e Addison, uma líder de torcida humana, se aproximam e desafiam o preconceito entre os dois grupos, tentando provar que podem conviver em harmonia.',
                ageRating: 'L',
                distributor: 'Disney Channel / Disney+',
                production: 'Disney Branded Television',
                tags: ['Musical','Família'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/cgsoyhwjhaafs2zaumd04/Zombies-480P.mp4?rlkey=eoa3131k9ee1fur6294yzw726&st=up8jkl0w'
            },
            {
                id: 'zombies-2',
                title: 'Zombies 2',
                type: 'filme',
                category: 'Musical / Romance / Comédia / Fantasia / Família',
                year: '2020',
                cover: 'https://i.ytimg.com/vi/Spk0zJNqCKU/maxresdefault.jpg',
                description: 'Após a convivência entre humanos e zumbis começar a se estabilizar, uma nova ameaça surge com a chegada dos lobisomens. Zed e Addison precisam unir os grupos rivais e evitar um novo conflito enquanto enfrentam desafios de identidade e pertencimento.',
                ageRating: 'L',
                distributor: 'Disney Channel / Disney+',
                production: 'Disney Branded Television',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ia3sv97bcf09xp43001c0/Zombies.2.2020-Hd.mp4?rlkey=gnae538tgqwagt3jng0v7le56&st=b1tt9iza'
            },
            {
                id: 'zombies-3',
                title: 'Zombies 3',
                type: 'filme',
                category: 'Musical / Romance / Comédia / Ficção científica / Fantasia / Família',
                year: '2022',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/db5ca0516ff1c7f470a8e4d6efbc12b5b8062ef92aca215fa84fb9d3088d53a5._SX1080_FMjpg_.jpg',
                description: 'Quando uma nave alienígena chega à cidade de Seabrook, Zed e Addison precisam lidar com a presença de extraterrestres que podem ameaçar a paz conquistada. Enquanto tentam ajudar os novos visitantes, eles enfrentam desafios que podem mudar o futuro de todos.',
                ageRating: 'L',
                distributor: 'Disney+ / Disney Channel',
                production: 'Disney Branded Television',
                url: 'https://dl.dropboxusercontent.com/scl/fi/s9cg96p5oyg68wt3lul41/Zombies.3-480P.mp4?rlkey=lqbhk156za7kat4eu5a6lzgf6&st=1k60llto'
            },
            {
                id: 'super-mario-2023',
                title: 'Super Mario Bros. – O Filme',
                originalTitle: 'The Super Mario Bros. Movie',
                type: 'filme',
                category: 'Animação / Aventura / Comédia',
                year: '2023',
                cover: 'https://img.odcdn.com.br/wp-content/uploads/2023/04/Super-Mario-Po%CC%81s-cre%CC%81ditos-1920x1080.jpeg',
                description: 'Dois irmãos encanadores do Brooklyn são sugados por um cano misterioso e acabam em um reino mágico; para salvar o novo mundo e reencontrar seu irmão, Mario precisa aprender que coragem é insistir mesmo tremendo.',
                tags: ['Lançamento','Popular'],
                duration: '92 minutos',
                director: 'Aaron Horvath e Michael Jelenic',
                studio: 'Illumination em parceria com Nintendo',
                distributor: 'Universal Pictures',
                cast: ['Chris Pratt','Anya Taylor-Joy','Charlie Day','Jack Black','Seth Rogen'],
                ageRating: 'L',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ynr8ww30kq7f4u2puw9hp/Super-Mario-Bros-O-Filme.mp4?rlkey=pmzlzleugqbjjo4te17wixhmp&st=suqist6c'
            },
            {
                id: 'heartstopper',
                title: 'Heartstopper',
                type: 'serie',
                category: 'Romance / Drama',
                year: '2022',
                cover: 'https://cinepop.com.br/wp-content/uploads/2022/04/AAAABc9YKEuRmNjwiTyK1lFICaN6OQN9MigeTk7JTOlvftA-9pz2hxqPQLPhxavB66sQeDCtP9NYVgmq1MRj8kkuli1WFVwU.jpg',
                description: 'Nesta história de amadurecimento, os adolescentes Charlie e Nick descobrem que sua amizade improvável pode ser algo a mais.',
                ageRating: '12',
                nextEpisodeTrigger: 285,
                ratings: { imdb: 8.5, rottenTomatoes: 96, metascore: 82 },
                seasons: {
                    1: [
                        { title: "Encontro", url: "https://dl.dropboxusercontent.com/scl/fi/hngjcsx55y01xa5qit5yy/Epis‑dio.01.mp4?rlkey=6hl0rxem4io4118fc00wjlgq2" },
                        { title: "Crush", url: "https://dl.dropboxusercontent.com/scl/fi/dltfolwgk6pptsl1lx4jk/Epis‑dio.02.mp4?rlkey=41lzw3p7p1qbq30rv6oud4eje" },
                        { title: "Beijo", url: "https://dl.dropboxusercontent.com/scl/fi/hr48fa5bxeynq9p24jjvq/Epis-dio.03.mp4?rlkey=sjqdwjqqyzjmbvwf53g7harhu" },
                        { title: "Segredo", url: "https://dl.dropboxusercontent.com/scl/fi/lqhi6a4ru2vh2wpl5by6y/Epis-dio.04.mp4?rlkey=1wzhsmlmyrsgk88ic19k0oelc" },
                        { title: "Amizade", url: "https://dl.dropboxusercontent.com/scl/fi/t5do3ztz0v95ad0pcxqvj/Epis-dio.05.mp4?rlkey=1qtqi4buifhnre62et57eeb5f" },
                        { title: "Garotas", url: "https://dl.dropboxusercontent.com/scl/fi/idxnh4xvzysany1z260on/Epis-dio.06.mp4?rlkey=03e8notm84gvojmdp5knbivqi" },
                        { title: "Bullying", url: "https://dl.dropboxusercontent.com/scl/fi/l5abe3fa54ofovs66bx4w/Epis-dio.07.mp4?rlkey=ru9qskk96v2uavprilr0p6z0f" },
                        { title: "Namoro", url: "https://dl.dropboxusercontent.com/scl/fi/z5slaudy4yd3odi0mc31s/Epis-dio.08.mp4?rlkey=yroyahhemiimiz4fidbb4giym" }
                    ],
                    2: [
                        { title: "Revelação", url: "https://dl.dropboxusercontent.com/scl/fi/z6wxqembvpx5re74txwyl/Epis-dio.01-1.mp4?rlkey=7duwphgvio102s6vlc9sgw609" },
                        { title: "Família", url: "https://dl.dropboxusercontent.com/scl/fi/m2ebxrdm0u5x2todblboy/Epis-dio.02-1.mp4?rlkey=4db0xj9uxla1an618je1sd95s" },
                        { title: "Promessa", url: "https://dl.dropboxusercontent.com/scl/fi/ti0m6hhzbb3mm1uo6hg2u/Epis-dio.03-1.mp4?rlkey=wc4hvcrodzsd4ooaj96w8jxkv" },
                        { title: "Desafio", url: "https://dl.dropboxusercontent.com/scl/fi/lqnsghqkyqyc3lbkj7tue/Epis-dio.04.mp4?rlkey=1cpntz9abqa0513ncuvu2aina&st=ojkh6szy" },
                        { title: "Calor", url: "https://dl.dropboxusercontent.com/scl/fi/babx2s608zpp8j55bakr7/Epis-dio.05.mp4?rlkey=29ua0szrkidzjmncr8ibj5cdw&st=aerq7f12" },
                        { title: "Verdade ou consequência", url: "https://dl.dropboxusercontent.com/scl/fi/b3k6je2tyrunna8d29ayw/Epis-dio.06.mp4?rlkey=m6ryhqmjg664hqmht69nnljxk&st=fwllamu7" },
                        { title: "Desculpas e arrependimentos", url: "https://dl.dropboxusercontent.com/scl/fi/09wnevoy1b4bzktua69ri/Epis-dio.07.mp4?rlkey=7iyfvxbysr9b4w3btyboeu5lx&st=6x93u38s" },
                        { title: "Perfeito", url: "https://dl.dropboxusercontent.com/scl/fi/zk3ovo2d1bp5rq7n1lkd6/Epis-dio.08.mp4?rlkey=aay10wnwogtgettfjdlsqs9xg&st=rxgpc813" }
                    ],
                    3: [
                        { title: "Amor", url: "https://dl.dropboxusercontent.com/scl/fi/4wrqectmmv03ab42yr02k/S3ep1.mp4?rlkey=7z9az4lgh1fczheio7eismciz&st=ux36zty0" },
                        { title: "Casa", url: "https://dl.dropboxusercontent.com/scl/fi/lbmfxi8x0ixzbj2ujkhxy/S3ep2.mp4?rlkey=d1d0g8h2228161jpliu331z02&st=00ypx6r4" },
                        { title: "Conversa", url: "https://dl.dropboxusercontent.com/scl/fi/kwoissm00uasg7gw2y89q/S3ep3.mp4?rlkey=5kg715cp8v0bqzcw8j40iy2kc&st=jwdm5hkz" },
                        { title: "Jornada", url: "https://dl.dropboxusercontent.com/scl/fi/7kgbv073fkkvevvxuzyw3/S3ep4.mp4?rlkey=jph3gz3kcw2r6ck9cxxyaccme&st=9tmgbd0o" },
                        { title: "Inverno", url: "https://dl.dropboxusercontent.com/scl/fi/s4dq3k9ecujoluwkfne30/S3ep5.mp4?rlkey=59ek669e76t458n9a7441t7cz&st=bihhsysz" },
                        { title: "Corpo", url: "https://dl.dropboxusercontent.com/scl/fi/gssry2sehn3ioe64hbu4u/S3e6.mp4?rlkey=aev0syvjchxgf2w5jn5woujjw&st=qnvinpl7" },
                        { title: "Juntos", url: "https://dl.dropboxusercontent.com/scl/fi/wxkmlie808teahh9dadji/S3e7.mp4?rlkey=5tgfecefslhrjklujydcmxcep&st=uc2yaf3q" },
                        { title: "Separados", url: "https://dl.dropboxusercontent.com/scl/fi/11ipxwlo3qxx2umam1aim/S3e8.mp4?rlkey=gb53r407vfmt0apn0mskne8vd&st=14mm33sf" }
                    ]
                }
            },
            {
                id: 'one-piece-live',
                title: 'One Piece: A Série',
                originalTitle: 'One Piece',
                type: 'serie',
                category: 'Ação, Aventura, Fantasia, Piratas',
                year: '2023',
                cover: 'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQoanayG9s_bmksLG_ns99SBRD5jng7a7SjSmSv0qZjdrHEaR9_jr3R8Zk_9coOaarTAubYV67HGQk6xNkGIZBX8flnwTVIFx2uB.jpg?r=71c',
                description: 'A série acompanha o jovem pirata Monkey D. Luffy, que sonha em se tornar o Rei dos Piratas. Após comer uma fruta misteriosa que lhe concede poderes elásticos, ele parte para o mar em busca do lendário tesouro One Piece, formando uma tripulação com novos amigos enquanto enfrenta piratas perigosos, a Marinha e segredos do mundo.',
                ageRating: '16',
                creators: ['Steven Maeda', 'Matt Owens'],
                executiveProducers: ['Eiichiro Oda','Steven Maeda','Matt Owens','Marty Adelstein','Becky Clements'],
                originalPlatform: 'Netflix',
                nextEpisodeTrigger: 388,
                tags: ['Nova Temporada'],
                seasons: {
                    1: [
                        { title: "O amanhecer de uma aventura", url: "https://dl.dropboxusercontent.com/scl/fi/0ioji1hyg1btpgvkzz1j7/1-1-2.mp4?rlkey=nda7bc4s0zr9tbaeblu60b6vf&st=x5355pp9" },
                        { title: "O homem do chapéu de palha", url: "https://dl.dropboxusercontent.com/scl/fi/hrp76agu7o8ocwoerv2jo/1-2.mp4?rlkey=jaopf2lb8188ewistjia0kjqf&st=cwla4swj" },
                        { title: "O contador de histórias", url: "https://dl.dropboxusercontent.com/scl/fi/13ztghzxkkddmpxfq0phy/1-3-13.mp4?rlkey=qb97ncdbyup59ytsuo2m9mb27&st=mli3vja7" },
                        { title: "Os piratas estão vindo", url: "https://dl.dropboxusercontent.com/scl/fi/qdaljbpl1lkvldy3bpi4w/1-4-12.mp4?rlkey=4xmn7ktdx5jx1ma13sedo7wkm&st=lyaj3bxm" },
                        { title: "Venha comer no Baratie!", url: "https://dl.dropboxusercontent.com/scl/fi/bvra71c17flk15fg7o1j3/1-5-8.mp4?rlkey=xo51mnowcwfn7ie1ab8dh9ysx&st=dfbldlgz" },
                        { title: "O chef e o faz-tudo", url: "https://dl.dropboxusercontent.com/scl/fi/n2dsy438hzur8z78a3jx0/1-6-14.mp4?rlkey=ol2y5516weu95c5vxu9c9iu3u&st=wvd4j4xq" },
                        { title: "A garota com a tatuagem de peixe-serra", url: "https://dl.dropboxusercontent.com/scl/fi/hzduvesw19xpebjkw8iwx/1-7-3.mp4?rlkey=r2rajkk2ltnc0njbrj3we70cp&st=pn0iq0xz" },
                        { title: "O mais procurado do East Blue", url: "https://dl.dropboxusercontent.com/scl/fi/oo2dhsh30k8mdxlsbl0li/1-8-3.mp4?rlkey=u6v6tqbw5lawuta0yid9srwsw&st=cdm1crgi" }
                    ],
                    2: [
                        { title: "O início e o fim", url: "https://dl.dropboxusercontent.com/scl/fi/3ggo82une8ewlxwwwxqmf/2-1-12-1.mp4?rlkey=bisi536orm2ps4lexgqyic6u2&st=dfspriiu" },
                        { title: "A balada da baleia", url: "https://dl.dropboxusercontent.com/scl/fi/w52afed1yr0v9fzk8wcdx/2-2-2.mp4?rlkey=iqiwoojpv0gdec3qw2kbwyio4&st=cosr6nq5" },
                        { title: "Não pisque em Whisky Peak", url: "https://dl.dropboxusercontent.com/scl/fi/tzekm6hze1sc8zs3b3lcc/2-3.mp4?rlkey=s1bndzcmxzuxnm5kwydm11le8&st=fp6s83r7" },
                        { title: "Problemas gigantes em Little Garden", url: "https://dl.dropboxusercontent.com/scl/fi/nia98362chea8d535cxnl/2-4-11.mp4?rlkey=vn7lhjxya0mmmpxg3uuqdpi8h&st=wq9hqhrs" },
                        { title: "Não vale fazer cera", url: "https://dl.dropboxusercontent.com/scl/fi/qgs58haahwynj4yin984n/2-5-24.mp4?rlkey=ccnwkxlcjclq9ms3rsvbpktlf&st=htkq2dx9" },
                        { title: "Querida Nami", url: "https://dl.dropboxusercontent.com/scl/fi/3sdba5dvx1k0g0f4x3sn1/2-6-4.mp4?rlkey=8c5ik4yf6d9jun86os1f7ybmi&st=t3d61axv" },
                        { title: "O médico e a rena", url: "https://dl.dropboxusercontent.com/scl/fi/sgykmmhjbmoao9qr86tcj/2-7-2.mp4?rlkey=f15n431lzz1xqipcq2u3531m4&st=cldd4no3" },
                        { title: "Batalha pelo Reino de Drum", url: "https://dl.dropboxusercontent.com/scl/fi/mbjwwxip1o5cxmxj17sxw/2-8-2.mp4?rlkey=xmfkz7no6hyt6yrmochhfo7os&st=2rznt5v8" }
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
                ageRating: 'L',
                url: 'https://dl.dropboxusercontent.com/scl/fi/7sbohwhegt2pl0x46vamb/Luca.2021.1080p.WEB-DL.DUAL.5.1.COMANDO.TO.mp4?rlkey=y0n75i1dectwu3lw1rcwibvul&st=kp56wmqc'
            },
            {
                id: 'matilda-1996',
                title: 'Matilda',
                originalTitle: 'Matilda',
                type: 'filme',
                category: 'Comédia / Fantasia / Família',
                year: '1996',
                yearBR: '1996',
                cover: 'https://www.calone.com.br/storage/2025/04/d314b81695d1f862c3c90af7437247785a6efea3b96fbc45513e382632ef1de5._SX1080_FMjpg_.jpg',
                description: 'Matilda é uma menina extremamente inteligente que vive com pais negligentes e sofre nas mãos da cruel diretora Trunchbull. Ao descobrir que possui poderes telecinéticos, ela decide usá-los para ajudar seus amigos e enfrentar as injustiças ao seu redor.',
                ageRating: 'L',
                distributor: 'Sony Pictures Releasing',
                production: 'TriStar Pictures / Jersey Films',
                url: 'https://youtu.be/zRUr6CSNzrQ'
            },
            {
                id: 'soul',
                title: 'Soul',
                type: 'filme',
                category: 'Animação / Drama',
                year: '2020',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/5914c529-42f8-47e5-be22-5bfce2361e67/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Joe Gardner é um professor de música que recebe a chance de tocar no melhor clube de jazz da cidade, mas um pequeno passo em falso o leva das ruas de Nova York para o Pré-Vida.',
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/grpsdlanqwe4uuece2c9r/Soul.mp4?rlkey=nsloinuu541dwyhbsaazipczz&st=h5hcr2om'
            },
            {
                id: 'divertida-mente-1',
                title: 'Divertida Mente',
                type: 'filme',
                category: 'Animação / Família',
                year: '2015',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/ca2b5ed3-e242-4a43-bc6a-2e02d024471b/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Crescer pode ser uma estrada esburacada, e não é exceção para Riley, que é desarraigada de sua vida no Meio-Oeste quando seu pai começa um novo emprego em São Francisco.',
                ageRating: 'L',
                url: 'https://dl.dropboxusercontent.com/scl/fi/cbd56c5ijx9396yz1o0ff/Divertida-Mente-1080p.mp4?rlkey=v1su0je6v0fgdhe7ocbcmwu00&st=usafvewx'
            },
            {
                id: 'jujutsu-execucao',
                title: 'JUJUTSU KAISEN: Execução',
                type: 'filme',
                category: 'Animação / Ação',
                year: '2024',
                cover: 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/4261/876d18b9b32b961a5ca7f7afe7250834.jpg',
                description: 'Jujutsu Kaisen: Execução é um filme compilatório que resume o trágico Incidente em Shibuya, onde um véu aprisiona civis e o poderoso Satoru Gojo, levando Yuji Itadori e outros feiticeiros a uma batalha caótica contra maldições, resultando em um Japão dividido em colônias amaldiçoadas e iniciando o mortal Jogo do Abate (Culling Game), com Yuta Okkotsu encarregado de executar Yuji por seus crimes.',
                ageRating: '18',
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
                ageRating: '14',
                url: 'https://dl.dropboxusercontent.com/scl/fi/lnwynwjmed0gkwpq5plsl/Five.Nights.At.Freddys.O.Pesadelo.Sem.Fim.2023-Hd.mp4?rlkey=aq5kv92zsqw5kdpxcehqfz20h&st=ij51pnak'
            },
            {
                id: 'fnaf-2',
                title: "Five Nights At Freddy's 2",
                type: 'filme',
                category: 'Terror / Suspense',
                year: '2025',
                cover: 'https://cinepop.com.br/wp-content/uploads/2025/12/fnaf-2-3.jpg',
                description: '‘Five Nights At Freddy’s 2‘, sequência do maior sucesso da história da Blumhouse, traz Mike, Abby e Vanessa tentando encontrar uma maneira de sobreviver por mais cinco noites quando um novo grupo de animatrônicos sai da pizzaria e causa o caos na cidade.',
                ageRating: '14',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ywfmv6pewt6ydloxbt4rv/Five.Nights.At.Freddys.2.2025-Hd-1.mp4?rlkey=jr0h1r3xw2oc25ndvx33jklz7&st=awj4agsl'
            },
            {
                id: 'spider-verse-pt',
                title: 'Homem-Aranha: Através do Aranhaverso',
                type: 'filme',
                category: 'Animação / Aventura',
                year: '2023',
                cover: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABbSgv1dDgUpXTDNz6i2tus0qkwMdlkzEV_AdhUVxxIc4EVKTyy-cxtKoSF3O2LjPhoJchs55PbxsQx1Uninvc4_dMz8PmRru0Q6q.jpg?r=7ea',
                description: 'Miles Morales volta a viajar pelos multiversos para enfrentar novas ameaças e reencontrar aliados e versões alternativas do Homem-Aranha.',
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/s2g0evrfwvwc1kwonsbk3/Homem-Aranha-2023-QGdosfilmes.mp4?rlkey=uo91bg13lwwdfifh7w2rvpgdq&st=88dq9hn1'
            },
            {
                id: 'topgun-maverick',
                title: 'Top Gun - Maverick',
                type: 'filme',
                category: 'Ação / Drama',
                year: '2022',
                cover: 'https://s2-techtudo.glbimg.com/Azg3GDuzrDvDPWFGXUU_HFwDl48=/0x0:1712x1054/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/v/d/igpA1vTVC6qIq8FdAcIA/topgun.jpg',
                description: 'Pete "Maverick" Mitchell volta à ativa para treinar uma nova geração de pilotos numa perigosa missão que exige sacrifício e coragem.',
                ageRating: '12',
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
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/7uii8bxj7o83ag6ughc3n/Homem-Aranha-2-Longe-De-Casa-2019-Dublado-SeriesZoiudo.mp4?rlkey=b11vwoa59gwpjrdxb6a4l7pmz&st=csr3bezl'
            },
            {
                id: 'outer-banks',
                title: 'Outer Banks',
                type: 'serie',
                category: 'Aventura / Mistério',
                year: '2020',
                cover: 'https://m.media-amazon.com/images/I/71AGTqm7ARL.jpg',
                description: 'John B e os Pogues enfrentam mistérios, tesouros e perigos enquanto buscam pistas sobre o pai desaparecido.',
                ageRating: '16',
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
                        { title: "Corsários – Segredos, interrogatórios e um artefato misterioso entram em jogo.", url: "https://drive.google.com/file/d/15GY-JX1LFnj4sLFn5kdkKz62BKUFG02qBbNvDy/view?usp=drive_link" },
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
                ageRating: '16',
                url: 'https://dl.dropboxusercontent.com/scl/fi/kbek8rogmax8p0ggubu4k/Pandeverso.mp4?rlkey=6psn3kj9bjo7dpjrbvobgch2n&st=54hiy3hj'
            },
            {
                id: 'um-filme-minecraft',
                title: 'Um Filme Minecraft',
                type: 'filme',
                category: 'Aventura / Fantasia / Família',
                year: '2025',
                yearBR: '2025 — estreia abril de 2025 nos cinemas',
                cover: 'https://akamai.sscdn.co/uploadfile/letras/playlists/0/f/0/c/0f0c0051d76042ad8fd1121e742718a1.jpg',
                description: 'Um grupo de pessoas é transportado para o mundo de Minecraft, onde precisam aprender a sobreviver e dominar as regras desse universo feito de blocos. Para voltar para casa, eles embarcam em uma jornada cheia de perigos, criaturas e descobertas, usando criatividade e trabalho em equipe.',
                ageRating: '10',
                distributor: 'Warner Bros. Pictures',
                production: 'Legendary Pictures / Mojang Studios',
                tags: ['Lançamento','Adaptação'],
                notes: 'Primeira adaptação live-action do jogo Minecraft.',
                url: 'https://dl.dropboxusercontent.com/scl/fi/az2k0opb3rea65lv2we6m/Um-Filme-Minecraft.mp4?rlkey=5mrxcknhr2suwzopfkdnvlhq8&st=w0ascwiu'
            },
            {
                id: 'it-bem-vindos-a-derry',
                title: 'IT: Bem-Vindos a Derry',
                type: 'serie',
                category: 'Horror / Suspense',
                year: '2025',
                cover: 'https://rollingstone.com.br/wp-content/uploads/2025/10/Que-horas-estreia-It-Bem-Vindos-a-Derry-serie-preludio-de-It-A-Coisa.jpg',
                description: 'A chegada de novos moradores a Derry coincide com acontecimentos estranhos que revelam que algo antigo e maligno voltou a despertar.',
                ageRating: '18',
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
                ageRating: '18',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ekad4zzvqvw74yba25z7x/Demon-Slayer-Kimetsu-No-Yaiba-Castelo-Infinito.mp4?rlkey=9fepnj37fl9q1i62wk4gfqk39&st=rqr4bt67'
            },
            {
                id: 'round-6',
                title: 'Round 6',
                type: 'serie',
                category: 'Drama / Suspense',
                year: '2021 - 2025',
                cover: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABSlCq3x0mzdgFd1PeYqPTxTE1awDh5jYeAayIIjvZjLBHy971DLaTHBAzWwuYygqn_xscoiBxMtf1LncymZJzkqhYw3M-GBNupEZ.jpg?r=90b',
                description: 'Centenas de pessoas endividadas aceitam participar de jogos infantis com uma recompensa milionária. O que elas não sabem é que perder significa morrer. À medida que os jogos avançam, alianças, traições e dilemas morais revelam até onde o ser humano é capaz de ir para sobreviver.',
                ageRating: '18',
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
                ageRating: '16',
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
                url: 'https://dl.dropboxusercontent.com/scl/fi/gx0kl1kqo7gnyo71poid7/WONKA-drivesdublados.mp4?rlkey=no0w57exdacuaowkps9fkpkis'
            },
            {
                id: 'bob-esponja-2025',
                title: 'Bob Esponja: Em Busca da Calça Quadrada',
                type: 'filme',
                originalTitle: 'The SpongeBob Movie: Search for SquarePants',
                category: 'Animação / Aventura / Comédia / Família',
                year: '2025',
                cover: 'https://cinepop.com.br/wp-content/uploads/2025/07/bob-esponja-696x392.jpg',
                description: 'Bob Esponja embarca em uma nova aventura submarina para provar sua coragem, enfrentando o temido Holandês Voador e explorando regiões desconhecidas do oceano.',
                ageRating: 'L',
                distributor: 'Paramount Pictures',
                url: 'https://dl.dropboxusercontent.com/scl/fi/wsmnw6ioob6ib1uk1bijd/The.SpongeBob.Movie.Search.for.SquarePants.2025-HD.mp4?rlkey=37c2tx1ia2mokj3suygahyyos&st=ojho138l'
            },

            {
                id: 'angry-birds-2016',
                title: 'Angry Birds: O Filme',
                type: 'filme',
                category: 'Animação, Comédia, Aventura, Família',
                year: '2016',
                yearBR: '2016 — estreia em 12 de maio de 2016 nos cinemas brasileiros',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/cf91f701fd3f7017f549f2fac6d7ce27d67eb35cd6815ac648936f3d121d6d1e._UR1920,1080_.jpg',
                description: 'Na Ilha dos Pássaros, onde todos vivem felizes sem poder voar, o temperamental Red, o veloz Chuck e o explosivo Bomb investigam a chegada de misteriosos porcos verdes. Quando descobrem um plano para roubar seus ovos, eles precisam agir para salvar sua comunidade.',
                ageRating: 'L',
                distributor: 'Sony Pictures Releasing',
                production: 'Rovio Animation / Columbia Pictures',
                tags: ['Animação','Família'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/80zikmw07y1za5o9vdbql/Angry-Birds.mp4?rlkey=osrhvi0mv1l6yjxjmm5odl5mo&st=x9zlb5oy'
            },
            {
                id: 'as-branquelas',
                title: 'As Branquelas',
                originalTitle: 'White Chicks',
                type: 'filme',
                category: 'Comédia, Crime',
                year: '2004',
                yearBR: '2004 — estreia em 24 de setembro de 2004 nos cinemas brasileiros',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/b6eb0fc5a7f92d8dd8566e054950aab592ae2dc9c8ffbda9b517ed8c0b20ae0c.png',
                description: 'Dois agentes do FBI se disfarçam como socialites brancas para investigar uma série de sequestros na alta sociedade. Durante a missão, eles precisam manter suas identidades em segredo enquanto lidam com situações absurdas e perigosas.',
                ageRating: '14',
                distributor: 'Sony Pictures Releasing',
                production: 'Columbia Pictures / Revolution Studios',
                yearBRNote: '2004 — estreia em 24 de setembro de 2004 nos cinemas brasileiros',
                url: 'https://dl.dropboxusercontent.com/scl/fi/zdvj3wj6kk2h9szsatavb/As-Branquelas.mp4?rlkey=vmlgxhypgyaowt1ozyn1wkuhh&st=613fzt2g'
            },
            {
                id: 'angry-birds-2-2019',
                title: 'Angry Birds 2: O Filme',
                originalTitle: 'The Angry Birds Movie 2',
                type: 'filme',
                category: 'Animação, Comédia, Aventura, Família',
                year: '2019',
                yearBR: '2019 — estreia em 3 de outubro de 2019 nos cinemas brasileiros',
                cover: 'https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/IEE4GXEHFRLIBKE3FD476UDNHA.jpg?smart=true&auth=c6c33e3c10dd54bfb350db851420f6b80e3466edcca2e2408aefe9e8751ca39e&width=1200&height=630',
                description: 'Pássaros e porcos deixam de lado a rivalidade quando uma nova ameaça surge: uma águia poderosa que planeja destruir suas ilhas com armas congelantes. Para impedir o desastre, eles precisam trabalhar juntos em uma missão arriscada.',
                ageRating: 'L',
                distributor: 'Sony Pictures Releasing',
                production: 'Rovio Animation / Columbia Pictures',
                tags: ['Animação','Família','Aventura'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/z81ea7gqnonpi7adtjhys/Angry.Birds.2.mp4?rlkey=ptszsvpsqt7irzhjvrkcuwefj&st=xert941d'
            },
            {
                id: 'alvin-na-estrada',
                title: 'Alvin e os Esquilos: Na Estrada',
                originalTitle: 'Alvin and the Chipmunks: The Road Chip',
                type: 'filme',
                category: 'Comédia / Família',
                year: '2015',
                cover: 'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRJvCa7pgjHPK5od-_e1QvA4o7CYcJUm5Wc2wjy1nLPt7S9L8TKDLB16koUcyo4lTDX7jnPiyGQGPrl0xFNIxw8tdofIRyRCuzT7.jpg?r=7ba',
                description: 'Alvin, Simon e Theodore embarcam numa aventura para impedir que Dave se case e perca a guarda de um possível novo integrante da família.',
                director: 'Walt Becker',
                studio: 'Fox 2000 Pictures',
                distributor: '20th Century Fox',
                rights: '20th Century Studios',
                ageRating: 'L',
                url: 'https://youtu.be/tVCfNHIOTgQ?feature=shared'
            },
            {
                id: 'alvin-2007',
                title: 'Alvin e os Esquilos',
                originalTitle: 'Alvin and the Chipmunks',
                type: 'filme',
                category: 'Animação/Live‑action, Aventura, Comédia, Família, Musical',
                year: '2007',
                cover: 'https://ntvb.tmsimg.com/assets/p170967_v_h10_aa.jpg?w=1280&h=720',
                description: 'Três esquilos cantores falantes — Alvin, Simon e Theodore — acabam indo morar com o compositor Dave Seville. Quando ele descobre o talento musical deles, transforma‑os em um sucesso pop, mas a fama começa a testar a lealdade e a amizade entre eles.',
                ageRating: 'L',
                distributor: '20th Century Fox',
                // classification note kept as an informal field for reference
                classificationNote: 'Livre / PG (recomendado a partir de ~10 anos) – classificação familiar com humor leve e música; em algumas regiões é considerada adequada para crianças (~10+).',
                url: 'https://dl.dropboxusercontent.com/scl/fi/twppv3ogoz1f3pwdqws4f/Alvin-e-os-Esquilos-2007-Dublado-720p-1.mp4?rlkey=nz47x3pzt37t1g0frxg2t5bct&st=pl7cqnty'
            },

            {
                id: 'alvin-2009',
                title: 'Alvin e os Esquilos 2',
                originalTitle: 'Alvin and the Chipmunks: The Squeakquel',
                type: 'filme',
                category: 'Comédia, Família, Musical, Live-action/Animação',
                year: '2009',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/19071ba2-96ea-4eff-b064-f917dc1f3fc1/compose?format=webp&width=2560',
                description: 'Enquanto Dave está ausente, Alvin, Simon e Theodore precisam se adaptar à escola e enfrentam a concorrência das Esquiletes, um trio feminino talentoso que ameaça seu sucesso musical.',
                ageRating: 'L',
                distributor: '20th Century Fox',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ildgavhpsoasihs4iql8y/Alvin-e-os-Esquilos-2-2009.mp4?rlkey=5glv0s1nqglzw9crj4qg243f3&st=tdn2nkg5'
            },

            {
                id: 'alvin-2011',
                title: 'Alvin e os Esquilos 3',
                originalTitle: 'Alvin and the Chipmunks: Chipwrecked',
                type: 'filme',
                category: 'Comédia, Aventura, Família, Musical',
                year: '2011',
                cover: 'https://occ-0-8407-2218.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABWAoFjAV2XyNlEGN2K4FtAeBTXv1e5abBTgGdvQQYEfdqT082MhK1e9x7atOQlvIel3C1fTjWe5nerVE04jZUwmEcHCMdyMb53Ui.jpg?r=caa',
                description: 'Durante um cruzeiro, os Esquilos e as Esquiletes acabam presos em uma ilha deserta. Enquanto tentam encontrar um caminho de volta para casa, vivem aventuras e descobertas inesperadas.',
                ageRating: 'L',
                distributor: '20th Century Fox',
                url: 'https://dl.dropboxusercontent.com/scl/fi/b57dkm3q3te66wivgnvgp/Alvin-e-os-Esquilos-3-2011.mp4?rlkey=8b50rfiot0fk7byebocl3l1v9&st=3jygpycr'
            },

            {
                id: 'os-vingadores-2012',
                title: 'Os Vingadores',
                originalTitle: 'The Avengers',
                type: 'filme',
                category: 'Ação, Aventura, Ficção Científica, Super-herói',
                year: '2012',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/e685a382-fc8d-4474-9fe3-54575a2c7c8d/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Quando Loki ameaça a Terra com o poder do Tesseract, Nick Fury reúne Homem de Ferro, Capitão América, Thor, Hulk, Viúva Negra e Gavião Arqueiro para formar uma equipe capaz de salvar o mundo.',
                ageRating: '12',
                distributor: 'Walt Disney Studios Motion Pictures / Marvel Studios',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ejwfdj4pcdjocxbht7kqi/Os-Vingadores-2012-GeekDriveBR.mp4?rlkey=1y8afrusfp8ijwkauq3kpjmrl&st=1uql4dh6'
            },

            {
                id: 'georgie-mandy-primeiro-casamento',
                title: 'Georgie e Mandy: Seu Primeiro Casamento',
                originalTitle: 'Georgie & Mandy: Their First Marriage',
                type: 'serie',
                category: 'Comédia / Sitcom / Família',
                year: '2024',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/12c978acf752610c4a64b745813c4b50205996e01fbf5188c4517cf7849d9374._SX1080_FMjpg_.jpg',
                description: 'Spinoff de Young Sheldon, acompanha Georgie Cooper e Mandy McAllister criando sua família no Texas e enfrentando os desafios do casamento e da paternidade.',
                ageRating: '12',
                distributor: 'Warner Bros. Television / CBS',
                seasons: {
                    1: [
                        { id: 'gm-s1-e1', title: 'Para Lubbock', date: '2024-10-30', duration: 21, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/c408jikso45x8rtuh8xve/G_A_M_F_M_1_1.mp4?rlkey=tb8qx43fao6xwwuyue2b2hk1l&st=kmeki3tu', synopsis: 'Georgie e Mandy enfrentam os desafios de criar a família e equilibrar a vida adulta.' },
                        { id: 'gm-s1-e2', title: 'Algumas Bobagens de Nova York', date: '2024-11-06', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/mo3p6ob1zrnb52fgjbflx/G_A_M_D_M_1_2.mp4?rlkey=ad9vxllzjy0dhgbi11va7asjd&st=lqmxc3lv', synopsis: 'Georgie tenta equilibrar trabalho e família, enquanto Mandy se preocupa com ele e Missy enfrenta problemas na escola.' },
                        { id: 'gm-s1-e3', title: 'Segredos, Mentiras e Um Monte De Dinheiro', date: '2024-11-13', duration: 18, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/t0ye9vbwy93383wzchy6h/G_A_M_F_M_1_3.mp4?rlkey=y9njb8fpuo939thzfg6xns1iz&st=0s2cdf5r', synopsis: 'Georgie descobre uma dívida secreta de Mandy; ela tenta reparar os erros no trabalho.' },
                        { id: 'gm-s1-e4', title: 'A Mãe Do Todd', date: '2024-11-20', duration: 18, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/u4t54x9crt0euvxy6hdsi/G_E_M_S_P_C_1_4.mp4?rlkey=bn81tf9vedjr4m3qfvmgra41o&st=vkt8qzeq', synopsis: 'Georgie e Mandy tentam fazer novos amigos, enquanto Jim e Audrey competem com Connor.' },
                        { id: 'gm-s1-e5', title: 'Dia De Ação De Graças', date: '2024-11-27', duration: 18, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/p93vh06p31ciwpgbpvhpb/G_E_M_S_P_C_1_5.mp4?rlkey=f0c1euqasnggmk4an4u0vqud2&st=k1uxg860', synopsis: 'Mandy tenta unir a família de Georgie em seu primeiro Dia de Ação de Graças sem o pai.' },
                        { id: 'gm-s1-e6', title: 'Um Samaritano Normal', date: '2024-12-18', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/tdhr5wv50o3ixbmi1vo5r/G_E_M_1_6.mp4?rlkey=sq9v5kgo36fuid0xrwgg2rgey&st=21njszs3', synopsis: 'Georgie se junta à igreja para vender pneus; Mandy suspeita de algo mais.' },
                        { id: 'gm-s1-e7', title: 'Um Velho Mustang', date: '2024-12-25', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/7vdmxq4clap2q62wbzvvn/G_E_M_S_P_C_1_7.mp4?rlkey=zjpzzzsspu19hiuo72u59rwxo&st=388k6xq8', synopsis: 'Georgie teme excluir Connor de um projeto; Mandy e Audrey tentam decorar o berçário sem brigar.' },
                        { id: 'gm-s1-e8', title: 'Merdas Diets', date: '2025-02-12', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/irj6wa3h777kp60xh1edb/G_MSPC_1_8.mp4?rlkey=448y4gamp5qd6o8xej108g8k1&st=2xdkcln1', synopsis: 'Conflitos surgem quando Georgie interfere no novo trabalho de Mandy; Audrey discorda da forma como Jim trata Connor.' },
                        { id: 'gm-s1-e9', title: 'Uma Convenção De Pneus e a Elevada Posição Moral', date: '2025-02-19', duration: 21, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/zr6togueuhtmpq78ke0el/GRGNDMNDFM_1_9.mp4?rlkey=0tsozkymle2gpy8vw12tbvalt&st=7d7yg1po', synopsis: 'Georgie descobre a verdade sobre a viagem de Jim; Mandy questiona seu casamento.' },
                        { id: 'gm-s1-e10', title: 'Uma Casa Dividida', date: '2025-02-26', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/56gtaz3dcsophynu05zvq/GM10LEG-BAIXO.mp4?rlkey=0fyemt3nu31rqu286ts8m6z9m&st=ladlcg18', synopsis: 'Uma discussão entre Audrey e Mary por causa de CeeCee e Georgie divide a família. Mandy acaba sendo pressionada a escolher um lado, aumentando ainda mais a tensão dentro de casa.' },
                        { id: 'gm-s1-e11', title: 'Trabalhando Para o Inimigo', date: '2025-03-05', duration: 20, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/wwqkcdr8euz6htp0jqnto/GRGMND_1_11.mp4?rlkey=q6p5oa8a9o6c2c3ovr89pizhi&st=jsi6wscf', synopsis: 'Georgie decide trabalhar para Fred Fagenbacher, antigo rival de Jim, trazendo à tona segredos do passado de Audrey. Enquanto isso, Mandy tenta manter a harmonia familiar.' },
                        { id: 'gm-s1-e12', title: 'Georgie Tifoide', date: '2025-03-12', duration: 18, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/owexh7biub9fb05qec3po/GRGMND_1_12.mp4?rlkey=bgd7vhzq1lasplb45paxvfoal&st=a7cowtwh', synopsis: 'Doente e preso em casa, Georgie teme estar decepcionando a família. Ao mesmo tempo, Mandy começa a questionar se sua carreira pode prejudicar seu casamento.' },
                        { id: 'gm-s1-e13', title: 'A Mcallister Auto Ama as Mulheres', date: '2025-03-19', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/uy1nt9r3qq7qcjkx0hlvt/GMANDY13LEG-BAIXO.mp4?rlkey=4so07hz9mlqmhklwl6n0y19fn&st=s5uc0aig', synopsis: 'Jim se sente pressionado quando Georgie e Audrey promovem mudanças na loja de pneus. Enquanto isso, Mandy ajuda Georgie a lidar com uma nova briga entre seus pais.' },
                        { id: 'gm-s1-e14', title: 'Uma Agente de Apostas e um Término', date: '2025-03-26', duration: 20, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/pwksj7mx3n6q3a8e0i7vh/GRGMNDSPC_1_14.mp4?rlkey=0vbr2qfhq196loepvg0efjohr&st=eyz4z1fh&paw=1', synopsis: 'Mandy descobre que Meemaw administra apostas esportivas ilegais e decide se envolver no negócio, o que acaba gerando novas complicações familiares.' },
                        { id: 'gm-s1-e15', title: 'A Deusa da Loja de Música', date: '2025-04-02', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/stzwo651pod2pfmfqj6qk/GRGMND_1_15.mp4?rlkey=lk0ua2tag52nmfp9z4qi5b4g7&st=3pu1umdn', synopsis: 'Georgie ajuda Connor a impressionar sua nova paixão, enquanto Mandy, Audrey e Jim tentam resistir à tentação de se intrometer na vida amorosa dele.' },
                        { id: 'gm-s1-e16', title: 'Briga Pelo Bebê!', date: '2025-04-09', duration: 18, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/8ehsmghbw2zuqomyxnale/GRGMND_1_16.mp4?rlkey=4imzpg5igjznhkjhv0v1vlstd&st=hj4nwibv', synopsis: 'Georgie e Mandy entram em conflito ao discordarem sobre ter outro filho, enquanto Mary, Jim e Audrey tentam não interferir na decisão do casal.' },
                        { id: 'gm-s1-e17', title: 'Dois Idiotas em uma Moto', date: '2025-04-16', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/kz9xnohmjox2xtjf3pd24/G17LEG-BAIXO.mp4?rlkey=wl6408f8qo4dpjowbdl1nrcbj&st=17ljxftm&dl=1', synopsis: 'A tentativa de Georgie de separar Missy de seu novo namorado acaba saindo pela culatra, causando ainda mais confusão na família.' },
                        { id: 'gm-s1-e18', title: 'Dinheiro da TV', date: '2025-04-23', duration: 20, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/95mc651wsqxr8lz5y6bk1/GRGMND_1_18.mp4?rlkey=evegk3yppifuhfll3mos2k6v8&st=xje26zve', synopsis: 'Mandy tenta provar que é responsável depois que Jim e Georgie criticam seus gastos. Ao mesmo tempo, a namorada de Connor precisa de um lugar para ficar.' },
                        { id: 'gm-s1-e19', title: 'Dedo-Duro x Caloteiro', date: '2025-04-30', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/wq14hv884z4in6ou6ohx8/G19DUB-BAIXO.mp4?rlkey=mpvgl169xst6dosc0cahalf10&st=enoilxda', synopsis: 'Mandy ajuda Meemaw a cobrar uma dívida de seu pai após ele perder apostas, enquanto Georgie tenta evitar um conflito entre sua avó e seu sogro.' },
                        { id: 'gm-s1-e20', title: 'Mulheres Adoram um Brunch', date: '2025-05-07', duration: 20, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/7cxk7sbmd0dwne25ns1ib/GRGMND_1_20.mp4?rlkey=59orapkzi200d05m5xdvptx7o&st=yvcv2mhn', synopsis: 'Georgie tenta equilibrar as expectativas de sua mãe, sua sogra e Mandy no Dia das Mães, enquanto Audrey insiste em conhecer a namorada de Connor.' },
                        { id: 'gm-s1-e21', title: 'Botas de Culpa', date: '2025-05-14', duration: 19, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/4qlmxojwjjn9s2fsvo0ay/GRGM_1_21.mp4?rlkey=o80ji752l27mrnr3hzhkinhzq&st=jkbr7ajh', synopsis: 'Georgie entra em pânico ao descobrir que Jim pretende vender a loja de pneus para seu rival, iniciando a primeira parte do final da temporada.' },
                        { id: 'gm-s1-e22', title: 'Grandes Decisões', date: '2025-05-21', duration: 20, rating: '12+', url: 'https://dl.dropboxusercontent.com/scl/fi/2pdg1cf24vet5yqe5ui80/GRGM_1_22.mp4?rlkey=v3h2ha8pfjlmh703vpxlp685j&st=mvur70wo', synopsis: 'Georgie descobre a verdade sobre o chefe de Mandy e faz de tudo para comprar a loja de pneus antes que Jim finalize a venda.' }
                    ],
                                      2: [
{ id: 's2-e1', title: "Um Desempate e um Grande Erro", url: "https://dl.dropboxusercontent.com/scl/fi/dp0yc8qp5v5xqp62g3gac/GRGMFM21.mp4?rlkey=op12o8f696rktb6i42jkzzr36&st=8tmn24et" },
{ id: 's2-e2', title: "Cartas de Fãs e Música de Órgão Antiga", url: "https://dl.dropboxusercontent.com/scl/fi/d3ssmqmix2xzc9xrb771g/GRGMFM22.mp4?rlkey=ummxf80u4qzd087jnlm23wssi&st=w6y3hkao" },
{ id: 's2-e3', title: "Um Testamento e a Esposa de um Homem Morto", url: "https://dl.dropboxusercontent.com/scl/fi/9qd8ldwaoe5znmfcie395/GAMFM23.mp4?rlkey=nov1zx3babxcibeszr8viqo72&st=7dlxs0jg" },
{ id: 's2-e4', title: "Mãos Sujas e uma Cerca de Arame Farpado", url: "https://dl.dropboxusercontent.com/scl/fi/gcsqum96g7hq7ks7ld000/GAMND24.mp4?rlkey=0023ozifxtjkrkwl2ayo9rxo8&st=tmq0eri9" },
{ id: 's2-e5', title: "Um Teste de Gravidez e a Bexiga de um Velho", url: "https://dl.dropboxusercontent.com/scl/fi/gl3995w1x0p52n2vr42f1/GRGEMNDSPC25.mp4?rlkey=nody908rr0z0t5a69s8zm23t1&st=g5m20zda" },
{ id: 's2-e6', title: "Coração Partido e o Refúgio dos Oprimidos", url: "https://dl.dropboxusercontent.com/scl/fi/9xtdn5ao1269cg0dntsyv/GRGEMNDSPC26.mp4?rlkey=fgkrygeur7yjklksvosseina8&st=hrayf5ha" },
{ id: 's2-e7', title: "Um Banco de Ônibus e Fé em Abundância", url: "https://dl.dropboxusercontent.com/scl/fi/df2h22svpgylpkze6zqse/GRGEMNDSPC27.mp4?rlkey=7tafj83cd03ned9sbocmxb4u8&st=10f3mh9a" },
{ id: 's2-e8', title: "Mordidas, Palmadas e um Monte de Baboseira Psicológica Ianque", url: "https://dl.dropboxusercontent.com/scl/fi/nha1tsycgyeluzsb2ifzt/GRGEMNDSPC28.mp4?rlkey=wt5mbrqfxlvk5qx0frhw09fpw&st=gbqucl46" },
{ id: 's2-e9', title: "A Vingança e uma Festa Parcial", url: "https://dl.dropboxusercontent.com/scl/fi/0ufr01oqecs5dhj40s7si/GRGMND29.mp4?rlkey=9lxtwycalekn2qdaiha8pnya3&st=e1luwkla" },
{ id: 's2-e10', title: "Miami Beach e um Natal Mágico em Família", url: "https://dl.dropboxusercontent.com/scl/fi/wjqs7691hey32ntg804up/GRGMND210.mp4?rlkey=4j8b3ymzh8vc12ygw2u60ps90&st=1o7dkwed" }
                    ]
                }
            },
            {
                id: 'guerreiras-kpop',
                title: 'Guerreiras do K‑Pop',
                originalTitle: 'K‑Pop Hunters',
                type: 'filme',
                category: 'Animação, Ação, Aventura, Música, Fantasia',
                year: '2025',
                cover: 'https://assets.b9.com.br/wp-content/uploads/2025/09/kpop-hunter-theme-park-1280x720.jpg',
                description: 'Três integrantes do grupo de K‑pop Huntr/x — Rumi, Mira e Zoey — além de serem estrelas da música, assumem a missão secreta de combater demônios que ameaçam o mundo, enfrentando também uma boyband rival enquanto equilibram fama e dever.',
                ageRating: '10',
                distributor: 'Netflix / Sony Pictures Animation',
                releaseNote: 'Estreiou em 20 de junho de 2025',
                url: 'https://dl.dropboxusercontent.com/scl/fi/ynpeb0jd8gbqjx3twmjl1/Guerreiras.do.KPop.2025-HD.mp4?rlkey=2qt44pdi0sc0ss4kn8ftissws&st=9w5222c1'
            },
            {
                id: 'coraline',
                title: 'Coraline e o Mundo Secreto',
                originalTitle: 'Coraline',
                type: 'filme',
                category: 'Animação / Fantasia',
                year: '2009',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/ae3ce4e04beae38473fa51fd111a778760943d48032d72587e3477c29442bb01._SX1080_FMpng_.png',
                description: 'Uma menina chamada Coraline descobre uma porta secreta que a leva para uma versão alternativa de sua vida — um Mundo Secreto que parece perfeito, mas esconde perigos sinistros.',
                director: 'Henry Selick',
                studio: 'Laika',
                distributor: 'Focus Features',
                rights: 'Laika',
                ageRating: '10',
                url: 'https://dl.dropboxusercontent.com/scl/fi/se65vw4dxf3jyu0ugbw8d/Coraline-E-O-Mundo-Secreto.mp4?rlkey=wemxgff2f56lwxhm4xjyaa978&st=4l3gkrrt'
            },
            {
                id: 'homem-aranha-sem-volta',
                title: 'Homem‑Aranha: Sem Volta Para Casa',
                type: 'filme',
                originalTitle: 'Spider-Man: No Way Home',
                category: 'Ação / Aventura / Fantasia / Super-herói',
                year: '2021',
                cover: 'https://occ-0-2256-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABcaZlB5cBXaQovKzRNe3DLOD5xe5ug2Msp7y4SHAFXs8Uu-s9esOCD1X3jnbYZZ4Dm-tM-cOgWh1FDmFD0wIfIfbrkpJAoULvXWX.jpg?r=c9b',
                description: 'Após sua identidade ser revelada ao mundo, Peter Parker pede a ajuda do Doutor Estranho para restaurá-la, mas o feitiço sai errado e abre o multiverso, trazendo poderosos vilões de outras realidades para seu mundo.',
                ageRating: '12',
                distributor: 'Sony Pictures Releasing',
                url: 'https://youtu.be/GUkyqX10T5o'
            },
            {
                id: 'cuphead',
                title: 'Cuphead: A Série',
                type: 'serie',
                category: 'Animação / Comédia / Aventura / Infantil/Familiar',
                year: '2022',
                ageRating: '10',
                cover: 'https://i.ytimg.com/vi/vJBYsEim_yU/maxresdefault.jpg',
                description: 'Acompanhe as desventuras do impulsivo Cuphead e seu irmão cauteloso Mugman pelas surreais Ilhas Inkwell, enfrentando fantasmas, concursos e até o próprio Diabo com humor inspirado nos desenhos dos anos 1930.',
                nextEpisodeTrigger: 234,
                seasons: {
                    1: [
                        { title: 'Carna-Mal', url: 'https://dl.dropboxusercontent.com/scl/fi/e6e2cavvizk2g69urk8nj/1-1-32.mp4?rlkey=anwg5iglw8hnz51e020mzjzus&st=xhtn5a5k' },
                        { title: 'Mamadeira', url: 'https://dl.dropboxusercontent.com/scl/fi/4yacfmolhak2rxuw2q629/1-2-24.mp4?rlkey=p3wca6u21l4gy93mnd7d49hrk&st=wwue0uez' },
                        { title: 'Ribby e Croaks', url: 'https://dl.dropboxusercontent.com/scl/fi/aqp9pl4itzhtqwia0pv7t/1-3-29.mp4?rlkey=iw91b4q79f8cadvzmdl0vf5yw&st=sdghbcoz' },
                        { title: 'Cuidado: Frágil', url: 'https://dl.dropboxusercontent.com/scl/fi/38dbfwly0a9pthmkh4dj4/1-4-19.mp4?rlkey=sjzdr9yoplgi84tp78qcudrfo&st=c26smany' },
                        { title: 'Jogando os Dados', url: 'https://dl.dropboxusercontent.com/scl/fi/ki2acjttebdujliz1boea/1-5-25.mp4?rlkey=pvw972hu7osblx47f7qj02fmz&st=r3yd6sj3' },
                        { title: 'Fantasmas Não Existem', url: 'https://dl.dropboxusercontent.com/scl/fi/m9a97dsaws5ezyygiya8j/1-6-22.mp4?rlkey=hx4qj5ep3mandp6j1z1iw255n&st=j3394yd1' },
                        { title: 'Root Pack', url: 'https://dl.dropboxusercontent.com/scl/fi/m12z3vpfiiwwdselusisq/1-7-17.mp4?rlkey=2v0j60xal7fap8spjsi2fxy9y&st=gy8c5iw1' },
                        { title: 'Melhor de Suéter', url: 'https://dl.dropboxusercontent.com/scl/fi/rljo6bevtp9w0sojkyaqb/1-8-19.mp4?rlkey=04stj6qc55duummrz414k62gm&st=k7i9vtrh' },
                        { title: 'Mais Suéter da Próxima Vez', url: 'https://dl.dropboxusercontent.com/scl/fi/8js1fxc7s9v43ix1e120d/1-9-10.mp4?rlkey=zpfyhg7f5wsd7faj05gaicliz&st=xhebcn21' },
                        { title: 'Caneco Perigoso', url: 'https://dl.dropboxusercontent.com/scl/fi/97woybbhq01xosm5xyffr/1-10-14.mp4?rlkey=ywtmfnv7bdvj6k29znnzoq200&st=qc03n4a9' },
                        { title: 'Sono Profundo', url: 'https://dl.dropboxusercontent.com/scl/fi/m1gslpmjxpqh1riwfd6jb/1-11-4.mp4?rlkey=ehyu5rv0xiq2rkvcbk4jxbq6u&st=8i8ocy3z' },
                        { title: 'Em Perigo', url: 'https://dl.dropboxusercontent.com/scl/fi/68cs5yta1ospjqydaoyz6/1-12-3.mp4?rlkey=x316333bpk07w9ua65wff4vag&st=hotya37e' }
                    ],
                    2: [
                        { title: 'Fuga da Prisão', url: 'https://dl.dropboxusercontent.com/scl/fi/9jty79gk1138336i10a1a/2-1-18.mp4?rlkey=kl173xmdrqbvqruhpudbgmflr&st=gully9mz' },
                        { title: 'Encantados e Perigosos', url: 'https://dl.dropboxusercontent.com/scl/fi/0mviz8p2i258qx6s3wscf/2-2-12.mp4?rlkey=18sqnh4trjacv6ofnkdzhayec&st=a1d0ozqa' },
                        { title: 'Uma Aventura em Alto-Mar', url: 'https://dl.dropboxusercontent.com/scl/fi/qtj6033rb217lyvppho0h/2-3-10.mp4?rlkey=ywweb63d9qas9vtlqak1y4vu2&st=vyaq488z' },
                        { title: 'Outro Irmão', url: 'https://dl.dropboxusercontent.com/scl/fi/0hfgcp15di63kxc7144j2/2-4-9.mp4?rlkey=svpwv6bstff73jojzj3zqni8b&st=ilrnvtlt' },
                        { title: 'Doce Tentação', url: 'https://dl.dropboxusercontent.com/scl/fi/v0iu9iqhyn15yseypdxl5/2-5-13.mp4?rlkey=fnd6mma8hkds9nsu5pufrov88&st=qua2z2jc' },
                        { title: 'O Cara do Sorvete', url: 'https://dl.dropboxusercontent.com/scl/fi/dikm0tebimkvpuxnq4ypo/2-6-20.mp4?rlkey=qtbpq6zey20qhsyjsggz4cvtx&st=q1kdvf2r' },
                        { title: 'Aula de Piano', url: 'https://dl.dropboxusercontent.com/scl/fi/oorgxm4236yk5dpt4hwv8/2-7-16.mp4?rlkey=en7zt11ufacvrc1ivldt8em5k&st=rx84ba8z' },
                        { title: 'Libere os Demônios!', url: 'https://dl.dropboxusercontent.com/scl/fi/02bymwzo0rdn804dw22v9/2-8-10.mp4?rlkey=960baslubngzrmndjs83ivnbj&st=fl7h12dw' },
                        { title: 'Mortalmente Falidos', url: 'https://dl.dropboxusercontent.com/scl/fi/af3ngvq3h4e0pzbe0dwh0/2-9-6.mp4?rlkey=7gpwen7ahicy8gepteureu9ev&st=px2bwy5w' },
                        { title: 'Por Hoje é Só, Ratinho', url: 'https://dl.dropboxusercontent.com/scl/fi/vu37k0f5zza2cd87v62xb/2-10-4.mp4?rlkey=zqgpw2bc5sj6feoopid3wa6b5&st=f49nsksu' },
                        { title: 'Diga Xis', url: 'https://dl.dropboxusercontent.com/scl/fi/3w21ya0gwlqu7m981ztzo/2-11-4.mp4?rlkey=utso0b14l0gycbm2gm8vwjcls&st=ok11mtio' },
                        { title: 'Perdidos na Floresta', url: 'https://dl.dropboxusercontent.com/scl/fi/cqdedwub232s7al94akbx/2-12-4.mp4?rlkey=lowui70bd17wtx11qrgp6nemz&st=ogn9k4v4' },
                        { title: 'Tridente do Diabo', url: 'https://dl.dropboxusercontent.com/scl/fi/dsz4m2hlpjfh4yxdtg6km/2-13-2.mp4?rlkey=bkdcxdntcdq93wsenfecooyi7&st=zuoqus6j' }
                    ],
                    3: [
    { title: 'Achado Não é Roubado!', url: 'https://dl.dropboxusercontent.com/scl/fi/kiq28pzc4xmcvr7n9l4v2/3-1-10.mp4?rlkey=zum8um89n1oexmovpnpsevcjx&st=0c5rcvjx' },
    { title: 'Não Abram a Porta', url: 'https://dl.dropboxusercontent.com/scl/fi/rkmbetaj8uzuem68a1l26/3-2-10.mp4?rlkey=ww9zsynygtqx3r7pk8jbkahuk&st=huyuyyp3' },
    { title: 'Ofuscado', url: 'https://dl.dropboxusercontent.com/scl/fi/uizcddxflrujvu9crmioq/3-3.mp4?rlkey=clry2k62qnavyvnz8h5ip36jx&st=wx4jqbq0' },
    { title: 'Atropelamento', url: 'https://dl.dropboxusercontent.com/scl/fi/7moi6dpep8ohufu69dxyw/3-4-3.mp4?rlkey=qa7w917n59paumwj2m5fdi4b1&st=3pazue91' },
    { title: 'Árvore de Natal', url: 'https://dl.dropboxusercontent.com/scl/fi/gc3ar9ymlp24ld31l4jiw/3-5-8.mp4?rlkey=7841evvuaov2dyh2ttbu90atd&st=jtffgh4o' },
    { title: 'Um Natal do Diabo', url: 'https://dl.dropboxusercontent.com/scl/fi/xvr1suzbedbzay5y1zu5j/3-6-6.mp4?rlkey=86esrljshwjgus0w6r7xxate9&st=4evirgmh' },
    { title: 'Entrega Especial', url: 'https://dl.dropboxusercontent.com/scl/fi/1vxcq9qcafu1hxrgbnaj3/3-7-9.mp4?rlkey=c5vp6z51rhrnaxf4vaib2tye6&st=ongurtvr' },
    { title: 'Dado', url: 'https://dl.dropboxusercontent.com/scl/fi/n0csa4dzt7trie9d7amrz/3-8-5.mp4?rlkey=8dxi7bxnmy7f8k3jalbdexb0r&st=h8jog8zo' },
    { title: 'Passeio Divertido', url: 'https://dl.dropboxusercontent.com/scl/fi/ltjxwk0mena9h6ik2iclz/3-9-6.mp4?rlkey=yoj52fth5eh2d0coxpe2ulpnm&st=5c2999j9' },
    { title: 'Brincando com o Perigo', url: 'https://dl.dropboxusercontent.com/scl/fi/8wogdwzukc92rzopcphsb/3-10-3.mp4?rlkey=3r7cair020lsa94h4vrw5s80x&st=m7037bx2' },
    { title: 'O Diabo e Senhorita Cálice', url: 'https://dl.dropboxusercontent.com/scl/fi/afh4gmm1pkrz503rdnos3/3-11.mp4?rlkey=h1bszplom6233nruwxgsyi55y&st=0yan6m2v' }
                  ]
                }
            },
            {
                id: 'amazing-digital-circus',
                title: 'O Incrível Circo Digital',
                originalTitle: 'The Amazing Digital Circus',
                type: 'serie',
                category: 'Animação / Humor sombrio / Drama psicológico',
                year: '2024',
                cover: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeSnycpEtbW-kf4BTjZdqNGjL39YFig-xRNfgSrG9Su1ayXXOhvMLgPsX3V6M-yQItQfqG1oqC-Shaq2_0Ll2OeOEGFaAiWw1OSP.jpg?r=988',
                description: 'O Incrível Circo Digital acompanha Pomni, uma mulher que, ao usar um headset de realidade virtual, fica presa dentro de um universo digital com temática de circo; a série mistura humor sombrio, surrealismo e drama psicológico enquanto explora identidade e memórias.',
                ageRating: '12',
                isYouTubeSeries: true,
                seasons: {
                    1: [
                        { id: 'yt-s1-e1-HwAPLk_sQ3w', title: 'Piloto', duration: 1514, url: 'https://www.youtube.com/embed/HwAPLk_sQ3w' },
                        { id: 'yt-s1-e2-4ofJpOEXrZs', title: 'Desespero no Desfiladeiro Doce!', duration: 1483, url: 'https://www.youtube.com/embed/4ofJpOEXrZs' },
                        { id: 'yt-s1-e3-bKjfw77cxeQ', title: 'O Mistério da Mansão Mildenhall', duration: 1400, url: 'https://www.youtube.com/embed/bKjfw77cxeQ' },
                        { id: 'yt-s1-e4-Q9KWcWKo2T8', title: 'Um Dia a Máscara Cai', duration: 1533, url: 'https://www.youtube.com/embed/Q9KWcWKo2T8' },
                        { id: 'yt-s1-e5-mOvhHim78YA', title: 'Sem Título', duration: 1533, url: 'https://www.youtube.com/embed/mOvhHim78YA' },
                        { id: 'yt-s1-e6-mOvhHim78YA-2', title: 'Todos Ganham Armas', duration: 2034, url: 'https://www.youtube.com/embed/mOvhHim78YA' },
                        { id: 'yt-s1-e7-oaOG1xOk7XY', title: 'Episódio de Praia', duration: 1976, url: 'https://www.youtube.com/embed/oaOG1xOk7XY' },
                        { id: 'yt-s1-e8-DMNlzf8PiEM', title: 'hjsakldfhl', duration: 0, url: 'https://www.youtube.com/embed/DMNlzf8PiEM?si=FdBSzqjAgiNoFqct' }
                    ]
                }
            },
            {
                id: 'subway-surfers-animated',
                title: 'Subway Surfers: A Série Animada',
                type: 'serie',
                category: 'Animação / Aventura',
                year: '2018',
                cover: 'https://i.ytimg.com/vi/xHY-DQYtQGw/maxresdefault.jpg',
                description: 'Esses adolescentes desajustados têm aventuras de patinação em sua pequena cidade e às vezes são parados pela polícia, mas o pouso de certa tecnologia alienígena muda a vida desses garotos.',
                ageRating: '14',
                producer: 'SYBO',
                distributor: 'YouTube (canal oficial Subway Surfers)',
                isYouTubeSeries: true,
                // enable Portuguese captions by requesting cc and preferring Portuguese via URL params
                seasons: {
                    1: [
                        { id: 'eWxnxzfgMao', title: 'Enterrado', duration: 285, url: 'https://www.youtube.com/embed/eWxnxzfgMao?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'pGw0oAFp9wY', title: 'Busted', duration: 221, url: 'https://www.youtube.com/embed/pGw0oAFp9wY?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'wmvqwb697Lg', title: 'Heirloom', duration: 203, url: 'https://www.youtube.com/embed/wmvqwb697Lg?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'LR1245gfItA', title: 'Stain', duration: 246, url: 'https://www.youtube.com/embed/LR1245gfItA?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'FvsUbmJaI_c', title: 'Recital', duration: 301, url: 'https://www.youtube.com/embed/FvsUbmJaI_c?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'FKUiHNLoo4Q', title: 'Invenção', duration: 245, url: 'https://www.youtube.com/embed/FKUiHNLoo4Q?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: '-h8g8GeuWRQ', title: 'Vigilância', duration: 262, url: 'https://www.youtube.com/embed/-h8g8GeuWRQ?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: '55WCwlMh0yk', title: 'Lição', duration: 257, url: 'https://www.youtube.com/embed/55WCwlMh0yk?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'JurFRipexao', title: 'Boombox', duration: 181, url: 'https://www.youtube.com/embed/JurFRipexao?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: '1ZyvQoX6ElE', title: 'Intrusos', duration: 226, url: 'https://www.youtube.com/embed/1ZyvQoX6ElE?cc_lang_pref=pt&cc_load_policy=1' },
                        { id: 'hud6wt4uw48', title: 'Flux', duration: 391, url: 'https://www.youtube.com/embed/hud6wt4uw48?cc_lang_pref=pt&cc_load_policy=1' }
                    ]
                }
            },

            {
                id: 'a-empregada',
                title: 'A Empregada',
                originalTitle: 'The Maid',
                type: 'filme',
                category: 'Suspense psicológico',
                year: '2026',
                cover: 'https://longahistoria.com.br/wp-content/uploads/2025/12/a-empregada-meio-amargo-capa.jpg',
                description: 'Millie, uma jovem com um passado difícil, aceita trabalhar como empregada doméstica para o casal milionário Winchester. O emprego, que parecia uma chance de recomeçar, logo revela segredos obscuros e manipulações perigosas por trás da fachada de uma vida perfeita.',
                ageRating: '16',
                director: 'Paul Feig',
                writer: 'Rebecca Sonnenshine',
                productionNote: 'Filme baseado no livro homônimo de Freida McFadden, adaptado para cinema',
                distributor: 'Paris Filmes (BR)',
                cast: ['Sydney Sweeney','Amanda Seyfried','Brandon Sklenar'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/hcmwzn9nwuw4tvilz46t9/THSMD_D.mp4?rlkey=awrbdcmyvy5nl7fztpyxv8y4r'
            },
            {
                id: 'o-primata',
                title: 'O Primata',
                originalTitle: 'Primate',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '2025/2026',
                cover: 'https://cinepop.com.br/wp-content/uploads/2025/10/o-primata-696x391.jpg',
                description: 'A universitária Lucy retorna para umas férias em casa no Havaí e se reúne com a família e o chimpanzé de estimação, Ben. Quando Ben é mordido por um animal silvestre e contrai raiva, ele se torna extremamente agressivo, forçando Lucy, amigos e parentes a lutarem pela sobrevivência enquanto tentam escapar do perigo.',
                shortSynopsis: 'Lucy volta da faculdade para passar alguns dias com a família; após o chimpanzé Ben contrair raiva, o fim de semana se transforma em uma luta pela sobrevivência.',
                duration: '89 minutos',
                ageRating: '18',
                director: 'Johannes Roberts',
                writers: ['Johannes Roberts','Ernest Riera'],
                production: '18Hz Productions',
                producers: ['Walter Hamada','John Hodges','Bradley Pilz'],
                distributor: 'Paramount Pictures',
                cast: ['Johnny Sequoyah','Jessica Alexander','Victoria Wyant','Gia Hunter','Benjamin Cheng','Troy Kotsur'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/w6342f8c66tza1ulpwteb/PRMT_D.mp4?rlkey=1bewah5mrn2r5709wbwjmh3w9'
            },
            {
                id: 'el-camino',
                title: 'El Camino: Um Filme de Breaking Bad',
                originalTitle: 'El Camino: A Breaking Bad Movie',
                type: 'filme',
                category: 'Crime / Drama',
                year: '2019',
                ageRating: '16',
                duration: 122,
                cover: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaU6IoT_jX47_a6rnhBYqj5x1UYUIPg-RPIErhVtQtk4nMt3yv6Un0Wz-dPf-WbjYdsqkg-8WdsOxxQbn7kn64hQu8s3urQX4Q-_.jpg?r=efe',
                description: 'Jesse Pinkman fugindo da polícia e de seus traumas após escapar do cativeiro no final de Breaking Bad, buscando liberdade e um novo recomeço enquanto lida com flashbacks do passado e tenta garantir seu futuro.',
                // prefer embed in a larger iframe — keep as provided src (will render in iframe)
                url: 'https://dl.dropboxusercontent.com/scl/fi/ysvdy6vc2dhkj569fjz5k/El.Camino-HD.mp4?rlkey=ooxhi47avsvsgggxzdgle41km&st=1bqteeyz'
            },
            {
                id: 'scream-1996',
                title: 'Pânico',
                originalTitle: 'Scream (1996)',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '1996',
                ageRating: '16',
                cover: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABccXgqXjgC0o-ud2hGqkysjV8V0ij3sXQxmmqZ99kxjKx94xoigeHgXolIeIiFQCgolwKcektQP-D30bVrHAl3q2PVwLOleXyUwf.jpg?r=f12',
                description: 'Em uma pacata cidade da Califórnia, um assassino mascarado fanático por filmes de terror assombra estudantes com telefonemas e violência brutal.',
                ratings: { imdb: 7.4, rottenTomatoes: 77 },
                url: 'https://dl.dropboxusercontent.com/scl/fi/ioxcukt5h8le1pux4r75v/P-nico.mp4?rlkey=yonc6tmrclp5fc0ftxw113zf0&st=4nlu6974'
            },
            {
                id: 'scream-2-1997',
                title: 'Pânico 2',
                originalTitle: 'Scream 2 (1997)',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '1997',
                ageRating: '14',
                cover: 'https://static.ndmais.com.br/2022/01/panico-2.jpg',
                description: 'Dois anos após os assassinatos em Woodsboro, Sidney e seus aliados enfrentam um novo Ghostface numa universidade enquanto tentam reconstruir suas vidas.',
                ratings: { imdb: 6.3, rottenTomatoes: 82 },
                url: 'https://dl.dropboxusercontent.com/scl/fi/kbt9ru1h8rufqtddks33w/P-nico2.mp4?rlkey=7zs7n8a07ljqoxbek0xqmvqao&st=v61yzcoe'
            },
            {
                id: 'scream-3-2000',
                title: 'Pânico 3',
                originalTitle: 'Scream 3 (2000)',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '2000',
                ageRating: '18',
                cover: 'https://cinepop.com.br/wp-content/uploads/2020/05/p%C3%A2nico-3-1.png',
                description: 'Sidney é atraída para Hollywood quando um novo Ghostface começa a matar o elenco de um filme baseado nos assassinatos de Woodsboro.',
                ratings: { imdb: 5.6, rottenTomatoes: 44 },
                url: 'https://dl.dropboxusercontent.com/scl/fi/txh34vnsmubgmxexnjtj3/Scream-3.mp4?rlkey=dk2q8s1omdrh031h06k07cwdz&st=b08mxbmp'
            },
            {
                id: 'scream-4-2011',
                title: 'Pânico 4',
                originalTitle: 'Scream 4 (2011)',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '2011',
                ageRating: '16',
                cover: 'https://cinepop.com.br/wp-content/uploads/2021/04/scream4-cinepop1.jpg',
                description: 'Quinze anos depois, Sidney retorna a Woodsboro e, ao promover seu livro, enfrenta um novo assassino Ghostface que mira jovens fãs dos antigos crimes.',
                ratings: { imdb: 6.2, rottenTomatoes: 61 },
                url: 'https://dl.dropboxusercontent.com/scl/fi/7b1o67ky9v78pyk51osgx/SCREAM-4.mp4?rlkey=twiam2enfdqzmu3ezn0ar4exs&st=73zztlv7'
            },
            {
                id: 'scream-5-2022',
                title: 'Pânico (2022)',
                originalTitle: 'Scream (2022)',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '2022',
                ageRating: '16',
                cover: 'https://tm.ibxk.com.br/2022/01/13/13093300424066.jpg',
                description: 'Vinte e cinco anos após os crimes originais, um novo Ghostface persegue um grupo de adolescentes em Woodsboro, reacesando segredos do passado mortal da cidade.',
                ratings: { imdb: 6.3, rottenTomatoes: 76 },
                url: 'https://dl.dropboxusercontent.com/scl/fi/qygkl6a5orfkn4h9e1tmw/Scream-5.mp4?rlkey=9aujtyh9i5fmz2bhc0oqapvsq&st=e3vla0if'
            },
            {
                id: 'scream-6-2023',
                title: 'Pânico 6',
                originalTitle: 'Scream VI (2023)',
                type: 'filme',
                category: 'Terror / Suspense',
                year: '2023',
                ageRating: '18',
                cover: 'https://s2-techtudo.glbimg.com/hhNztmkaLms4ZRgVaaFqGgIwzpQ=/0x0:1440x750/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/C/I/XXlufbQK6zXbAijdbRNw/scream-6.webp',
                description: 'Os sobreviventes deixam Woodsboro e recomeçam em Nova York, mas um novo e mais brutal Ghostface os persegue pela metrópole.',
                ratings: { imdb: 7.6, rottenTomatoes: 77 },
                url: 'https://dl.dropboxusercontent.com/scl/fi/83pz2yzii8rr7zqv4v18h/Scream-6C-1.mp4?rlkey=72lge96kvpp673hit7gx47ee8&st=l1nc34de'
            },
            {
                id: 'panico-7',
                title: 'Pânico 7',
                originalTitle: 'Scream 7',
                type: 'filme',
                category: 'Terror / Mistério / Crime',
                year: '2026',
                yearBR: '2026',
                ageRating: '18',
                cover: 'https://rollingstone.com.br/wp-content/uploads/2026/02/Panico-7-com-o-retorno-de-Neve-Campbell-estreia-nos-cinemas-brasileiros-800x450.jpg',
                description: 'Quando um novo assassino Ghostface surge na pacata cidade onde Sidney Prescott reconstruiu sua vida, seus medos mais sombrios tornam-se realidade enquanto sua filha se torna o novo alvo. Determinada a proteger sua família, Sidney deve enfrentar os horrores do passado e tentar pôr fim ao massacre.',
                distributor: 'Paramount Pictures',
                production: ['Spyglass Media Group', 'Project X Entertainment', 'Outerbanks Entertainment'],
                tags: ['Lançamento','Série Pânico'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/21zbjic9xs0vokhc5snzk/Fhyawatm6digkk9u-1.mp4?rlkey=bt52prmnce63y9v7wrr1mk8vq&st=r4as72fu'
            },

            {
                id: 'zootopia-2016',
                title: 'Zootopia: Essa Cidade é o Bicho',
                originalTitle: 'Zootopia',
                type: 'filme',
                category: 'Animação, Aventura, Comédia, Mistério, Família',
                year: '2016',
                yearBR: '2016',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/019b2eff-a563-7bb9-9b85-715e90eda701/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Na cidade animal de Zootopia, a coelha policial Judy Hopps desafia as expectativas ao se tornar a primeira de sua espécie na força policial. Determinada a provar seu valor, ela se une ao astuto raposo Nick Wilde para resolver um grande mistério que abala a metrópole animal.',
                ageRating: 'L',
                distributor: 'Walt Disney Studios Motion Pictures',
                production: 'Walt Disney Animation Studios',
                tags: ['Lançamento','Popular'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/h9hp1w4eyvy7re7cdodir/Zootopia.mp4?rlkey=olsnv76c5cv9mxr4ij7040q5a&st=wo8roe09'
            },
            {
                id: 'zootopia-2-2025',
                title: 'Zootopia 2: Aventura na Cidade Animal',
                originalTitle: 'Zootopia 2',
                type: 'filme',
                category: 'Animação, Aventura, Comédia, Família',
                year: '2025',
                yearBR: '2025',
                cover: 'https://ingresso-a.akamaihd.net/b2b/production/uploads/article/image/3464/c4bff45cee411e2f395c0d8e3ce93bcc.jpg',
                description: 'Judy Hopps e Nick Wilde, agora experientes policiais de Zootopia, enfrentam um novo mistério quando a chegada de um reptil chamado Gary De’Snake vira a cidade de cabeça para baixo. Para solucionar o caso e limpar seus nomes, eles precisam ir disfarçados a áreas inesperadas da metrópole animal, colocando à prova sua parceria e coragem.',
                ageRating: 'L',
                distributor: 'Walt Disney Studios Motion Pictures (lançamento nos cinemas brasileiros pela Disney Brasil)',
                production: 'Walt Disney Animation Studios',
                tags: ['Lançamento','Popular'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/xyzqerjkmyb6g1eh534p9/ZTPA2_D.mp4?rlkey=ilxatr4tc33d18uhn89sqhju7&st=syt365zr'
            },
            {
                id: 'wandinha',
                title: 'Wandinha',
                originalTitle: 'Wednesday',
                type: 'serie',
                category: 'Mistério, Comédia Sombria, Sobrenatural, Fantasia, Teen',
                year: '2022',
                cover: 'https://image.tmdb.org/t/p/original/10H2WvTRlCP8Yr28geYOhjGTZFS.jpg',
                description: 'A série acompanha Wandinha Addams durante seus anos na Academia Nevermore. Enquanto tenta dominar suas habilidades psíquicas, ela se envolve em um mistério envolvendo uma série de assassinatos e segredos ligados à história de sua família.',
                ageRating: '14',
                creators: ['Alfred Gough','Miles Millar'],
                executiveProducers: ['Tim Burton','Alfred Gough','Miles Millar','Steve Stark','Andrew Mittman','Kevin Miserocchi','Kayla Alpert','Jonathan Glickman','Gail Berman'],
                originalPlatform: 'Netflix',
                nextEpisodeTrigger: 30,
                seasons: {
                    1: [
                        { id: 'w-s1-e1', title: 'Wandinha é só desgosto', url: 'https://dl.dropboxusercontent.com/scl/fi/c8ws8dkze5z0cbocso8a1/ep-1.mp4?rlkey=70om5o6dbfh2eonz5e6ejl699&st=q6yp6x5r' },
                        { id: 'w-s1-e2', title: 'Desgosto solitário', url: 'https://dl.dropboxusercontent.com/scl/fi/27ybdet8xqb28zzwx5zuv/ep-2.mp4?rlkey=2rp27izk4zy7tdue671xqp33h&st=4e5g4djd' },
                        { id: 'w-s1-e3', title: 'Amiga ou desgosto', url: 'https://dl.dropboxusercontent.com/scl/fi/0ietc984rbaj361fqvn93/ep-3.mp4?rlkey=s55azlet8wityktdhsyfoq2r2&st=ove8vr9x' },
                        { id: 'w-s1-e4', title: 'Noite de desgosto', url: 'https://dl.dropboxusercontent.com/scl/fi/rcjv6mhyrztlymqkol40c/ep-4.mp4?rlkey=8m7uyiz5gczpwpw6ia30ab321&st=ivvb63d4' },
                        { id: 'w-s1-e5', title: 'Quem planta desgosto, colhe...', url: 'https://dl.dropboxusercontent.com/scl/fi/4h33h4kmiel04cbgamyaw/ep-5.mp4?rlkey=2ig5ioztu9i3xuvv41pxdbknf&st=137xu4pd' },
                        { id: 'w-s1-e6', title: 'Toma lá, não dá cá', url: 'https://dl.dropboxusercontent.com/scl/fi/5tdox0ntrh4457u2jgqkz/ep-6.mp4?rlkey=l6rsjdmkxhcasop33u0tvj5n1&st=nej0bzna' },
                        { id: 'w-s1-e7', title: 'Se não me conhece ainda...', url: 'https://dl.dropboxusercontent.com/scl/fi/hudp1bmft2cmpmhuld2lq/ep-7.mp4?rlkey=l3fhw4laaca3iq2zr91i3xng6&st=5flakmxf' },
                        { id: 'w-s1-e8', title: 'Confrontando desgostos', url: 'https://dl.dropboxusercontent.com/scl/fi/107g1z0jmdjd2he0p6nlv/ep-8.mp4?rlkey=wznfcyaul5l0pwdiqpvpdaaf1&st=alezradp' }
                    ],
                    2: [
                        { id: 'w-s2-e1', title: 'Mais desgosto', url: 'https://dl.dropboxusercontent.com/scl/fi/6f2fihcvew0er62q9g98g/2x01-driveprime3-no-telegram.mp4?rlkey=qw7s4bh8kvktu2a0bfbh9eoji&st=sxik89ng' },
                        { id: 'w-s2-e2', title: 'Confronto', url: 'https://dl.dropboxusercontent.com/scl/fi/33nykvt4lcbcn5tibaq4t/2x02-driveprime3-no-telegram.mp4?rlkey=1oksbw0xw8504w5253l66kayg&st=ru9v3z7b' },
                        { id: 'w-s2-e3', title: 'Chamado da natureza', url: 'https://dl.dropboxusercontent.com/scl/fi/ji2zevxo7plbwtxmc2n9j/2x03-driveprime3-no-telegram.mp4?rlkey=qlt6eodksdgarde6iw65gqhx5&st=6sqyixum' },
                        { id: 'w-s2-e4', title: 'Se estas paredes falassem', url: 'https://dl.dropboxusercontent.com/scl/fi/q8ket766w0couodvtzern/2X04-Driveprime3-No-Telegram.mp4?rlkey=2wzeh82g1180tatwjtcupizy4&st=woa1wllz' },
                        { id: 'w-s2-e5', title: 'Hyde escondido', url: 'https://dl.dropboxusercontent.com/scl/fi/j6stkkl5ul2od74p678fk/2x05-driveprime3-no-telegram.mp4?rlkey=xbfggouztmjhaubw3wsubqm01&st=mfw3g5vu' },
                        { id: 'w-s2-e6', title: 'Conhece a ti mesmo', url: 'https://dl.dropboxusercontent.com/scl/fi/uvkkf4uec9qx9hvqdtcy8/2x06-driveprime3-no-telegram.mp4?rlkey=hezuofok2pida3ab8bx9o3l2x&st=njhf6rus' },
                        { id: 'w-s2-e7', title: 'De olho no dinheiro', url: 'https://dl.dropboxusercontent.com/scl/fi/9rjqpjab3bj1a67byp4s8/2x07-driveprime3-no-telegram.mp4?rlkey=edwhgb8zqbb7x0sorpdav3yau&st=jlaj6n3s' },
                        { id: 'w-s2-e8', title: 'É guerra!', url: 'https://dl.dropboxusercontent.com/scl/fi/suwc320qaiieoui2wcata/2x08-driveprime3-no-telegram.mp4?rlkey=qcg27c0qxefe7201wmga9121z&st=mat3f1je' }
                    ]
                }
            },
            {
                id: 'descendentes-1',
                title: 'Descendentes',
                type: 'filme',
                category: 'Comédia / Fantasia / Família / Musical',
                year: '2015',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/6d6b7419-cbbd-436f-9568-04bc3bece7e6/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'No reino de Auradon, o filho do Rei e da Rainha convida os filhos dos vilões exilados a frequentarem sua escola, onde eles precisam decidir entre seguir o caminho dos pais ou descobrir seu próprio destino.',
                ageRating: 'L',
                distributor: 'Disney–ABC Domestic Television / Disney Channel',
                url: 'https://dl.dropboxusercontent.com/scl/fi/y872rhf566v6n0vfed7m0/Descendentes-2015-Dublado-SeriesZoiudo.mp4?rlkey=7mkiqz5xvwj8zszezeoczhr8n&st=y5lp8btz'
            },
            {
                id: 'descendentes-2',
                title: 'Descendentes 2',
                type: 'filme',
                category: 'Musical / Fantasia / Aventura',
                year: '2017',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/753ced35-82e9-4e3f-b0c4-7946448001a2/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Mal e seus amigos enfrentam novos desafios quando Uma, filha de Úrsula, e sua gangue começam a causar confusão, levando o grupo de volta à Ilha dos Perdidos para confrontar seus rivais.',
                ageRating: 'L',
                distributor: 'Disney Channel',
                url: 'https://dl.dropboxusercontent.com/scl/fi/pgsfmge70fd9ak45hq345/Descendentes-2-2017-Dublado-SeriesZoiudo.mp4?rlkey=3curz4xr1jtrltr0ip1t4t6xh&st=1a4k5q44'
            },
            {
                id: 'descendentes-3',
                title: 'Descendentes 3',
                type: 'filme',
                category: 'Musical / Fantasia / Aventura',
                year: '2019',
                cover: 'https://cdn.fstatic.com/media/movies/photos/2019/04/descendentes-3_t250694.jpg',
                description: 'Enquanto Mal se prepara para se tornar rainha em Auradon, novas ameaças de vilões antigos e rivais pessoais obrigam o grupo a unir forças para proteger seu reino.',
                ageRating: 'L',
                distributor: 'Disney Channel',
                url: 'https://dl.dropboxusercontent.com/scl/fi/qv3eo6uei4dy1h4wrd8eb/drivefilmesz_chat.dffdthcds.2019.mp4?rlkey=6pz7ye4jsmfkln8y4w1qsrdgq&st=x5tfh43r'
            },
            {
                id: 'sonic-2020',
                title: 'Sonic: O Filme',
                type: 'filme',
                category: 'Ação, Aventura, Comédia, Família, Fantasia',
                year: '2020',
                cover: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipgMq_UcPfpLvIH-qLrAWIsrnUDTSin8221S39KRl3YsbiYNZAD47vO3kf1xRR7vZoJEpssXd4f39n3IxsqxtVbihWL95fvZoxtw2BKzro7ntN6zXklTuhHlG2T6aLMBE_cV1aSbOhq4oL/s1280/00+-+Sonic+O+Filme+%2528Sonic+the+Hedgehog%252C+2020%2529.jpg',
                description: 'Sonic, o ouriço azul super-rápido, se muda para o mundo humano e faz amizade com o policial Tom. Juntos, precisam impedir que o Dr. Robotnik capture Sonic e use seus poderes para dominar o mundo.',
                ageRating: '10',
                distributor: 'Paramount Pictures',
                url: 'https://dl.dropboxusercontent.com/scl/fi/vmnlccjzhnksiic11v6ce/sonic-o-filme-dublado-www_encontrei_tv-backup.mp4?rlkey=qw40asos2whoo3y6dnugtfryj&st=0ffdnzxi'
            },
            {
                id: 'sonic-2-2022',
                title: 'Sonic 2: O Filme',
                type: 'filme',
                category: 'Ação, Aventura, Comédia, Família, Fantasia',
                year: '2022',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/1cec6ee0900e48fc5a52c6b2d8fc9d64a20b00997801829e2d831397c5ba536b.jpg',
                description: 'Sonic e Tom fazem amizade com Tails, um jovem raposo voador, e juntos enfrentam o Dr. Robotnik, que retorna com o poder de Knuckles para conquistar a Esmeralda Mestre.',
                ageRating: '10',
                distributor: 'Paramount Pictures',
                url: 'https://dl.dropboxusercontent.com/scl/fi/hwwyuu16orlt8ro50zj4m/sonic-2-o-filme-dublado-www_encontrei_tv-backup.mp4?rlkey=h7ek2cqf2p96c98rp1u80tod1&st=531ssyz2'
            },

            {
                id: 'sonic-3-2024',
                title: 'Sonic 3: O Filme',
                type: 'filme',
                category: 'Ação, Aventura, Comédia, Família, Fantasia',
                year: '2024',
                cover: 'https://recreio.com.br/wp-content/uploads/2024/12/sonic-3_capa-1.jpg',
                description: 'Sonic, Tails e Knuckles enfrentam um novo e poderoso inimigo chamado Shadow, que ameaça o mundo. Para detê‑lo, eles precisam unir forças — inclusive com antigos rivais — e proteger a Terra de um grande perigo.',
                ageRating: '10',
                distributor: 'Paramount Pictures',
                url: 'https://dl.dropboxusercontent.com/scl/fi/r7zgcy50ygx97eeqz65ms/SNCTH_tt18259086_D.mp4?rlkey=9jylup8qhd0xlw8ux7yzvpxem&st=dbwl8l1l'
            }
            ,
            {
                id: 'moana-2-2024',
                title: 'Moana 2',
                originalTitle: 'Moana 2',
                type: 'filme',
                category: 'Animação, Aventura, Comédia, Família',
                year: '2024',
                yearBR: '2024',
                cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/ac70c442-571e-48ae-8733-7494bd7d27c6/compose?aspectRatio=1.78&format=webp&width=1200',
                description: 'Três anos após sua primeira jornada, Moana recebe um chamado de seus ancestrais e parte em uma nova aventura pelos mares distantes da Oceania ao lado de Maui e uma nova tripulação. Juntos, eles precisam quebrar uma antiga maldição e enfrentar perigos desconhecidos para restaurar o equilíbrio dos oceanos.',
                ageRating: 'L',
                duration: 100,
                distributor: 'Walt Disney Studios Motion Pictures',
                production: 'Walt Disney Animation Studios',
                tags: ['Lançamento','Família'],
                notes: 'Estreia no Brasil em 28 de novembro de 2024.',
                url: 'https://dl.dropboxusercontent.com/scl/fi/zjucuo9evs6mzlwwz2fb7/Mn2-Tt13622970-D.mp4?rlkey=mdd8hf1nj744wlfpflgl136tp&st=v7s9o6oc'
            },
            {
                id: 'moana-2016',
                title: 'Moana: Um Mar de Aventuras',
                originalTitle: 'Moana',
                type: 'filme',
                category: 'Animação, Aventura, Comédia, Família, Fantasia, Musical',
                year: '2016',
                yearBR: '2017',
                cover: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNe2EyzbxLQ7KZl7RBkJ6ryqePDFQz2hO3ZkQa0R53-btIickYd2aFx0LlKHP6BLfwJ19RFS9DhTWhLkk7xf-I8MRB352Z5aJQZwsJuLfFlH-yJ6cN0BHVov9Uim6htK1IS3I_gwI3lc8/w1200-h630-p-k-no-nu/painel-moana-1-00-x-0-70m-painel.jpg',
                description: 'Moana, filha do chefe de uma tribo na Oceania, parte em uma jornada pelo oceano para salvar seu povo de uma antiga maldição. Ao lado do semideus Maui, ela enfrenta criaturas marinhas e descobre seu verdadeiro destino como navegadora.',
                ageRating: 'L',
                duration: 110,
                distributor: 'Walt Disney Studios Motion Pictures',
                production: 'Walt Disney Animation Studios',
                notes: 'Estreia no Brasil em 5 de janeiro de 2017.',
                url: 'https://dl.dropboxusercontent.com/scl/fi/rfc5fpxg0iazl4ufdogbp/Moana-Um-Mar-De-Aventuras-2016-Dublado-1080P.mp4?rlkey=otg5vzozc7gksgi5bc61ym4th&st=fhg11zpl'
            },
            {
                id: 'como-treinar-o-seu-dragao',
                title: 'Como Treinar o Seu Dragão',
                originalTitle: 'How to Train Your Dragon',
                type: 'filme',
                category: 'Animação, Aventura, Fantasia, Família',
                year: '2010',
                yearBR: '2010',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/e30b59549dac1e89d0d4dbe6c1ffb1f81c499c4d9be764c50a846f797b10a3f1.jpg',
                description: 'Soluço, um jovem viking, vive em uma vila onde dragões são inimigos. Ao capturar um raro dragão chamado Banguela, ele descobre que essas criaturas não são tão perigosas quanto parecem, mudando completamente a forma como seu povo vê os dragões.',
                ageRating: 'L',
                distributor: 'Paramount Pictures',
                production: 'DreamWorks Animation',
                tags: ['Clássico','Família'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/iwqubballkr3wxgefcvpb/Como.Treinar.O.Seu.Dragao-Hd.mp4?rlkey=02sb7rh7nkkqk0nd0q4hxmqrp&st=0jcf833k'
            },
            {
                id: 'como-treinar-o-seu-dragao-2025',
                title: 'Como Treinar o Seu Dragão',
                originalTitle: 'How to Train Your Dragon',
                type: 'filme',
                category: 'Aventura, Fantasia, Ação, Família',
                year: '2025',
                yearBR: '2025',
                cover: 'https://i.ytimg.com/vi/n_U-67WfHp0/maxresdefault.jpg',
                description: 'Soluço, um jovem viking que não se encaixa nas tradições de sua vila, captura um raro dragão chamado Banguela, mas decide libertá-lo. Ao criar uma amizade inesperada, ele descobre que humanos e dragões podem viver em paz e tenta mudar a forma como seu povo vê essas criaturas.',
                ageRating: '10',
                distributor: 'Universal Pictures',
                production: 'DreamWorks Animation / Marc Platt Productions',
                director: 'Dean DeBlois',
                duration: '125 minutos',
                tags: ['Remake','Live‑action'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/0dimyh3zv7k3ynf49cbb0/Cm.Tr.Drg.25-Hd.mp4?rlkey=oxto4r5ks6ybc4pu53jmt5mjx&st=t7oirif0'
            },
            {
                id: 'como-treinar-o-seu-dragao-2',
                title: 'Como Treinar o Seu Dragão 2',
                originalTitle: 'How to Train Your Dragon 2',
                type: 'filme',
                category: 'Animação, Aventura, Fantasia, Ação, Família',
                year: '2014',
                yearBR: '2014',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/cb3c95400a3fb3ad7da19ca4c0bbacb2eb7dbf5df9e749fb673aa0e5c22f1dae._UR1920,1080_.jpg',
                description: 'Anos após unir vikings e dragões, Soluço e Banguela exploram novos territórios e descobrem uma ameaça perigosa liderada por um conquistador que controla dragões. Durante a jornada, Soluço também encontra uma figura importante de seu passado, mudando seu destino para sempre.',
                ageRating: 'L',
                distributor: '20th Century Fox',
                production: 'DreamWorks Animation',
                tags: ['Clássico','Família','Aventura'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/yqlwwshs1aj9ittck6b6s/Como.Treinar.Dragao.2-Hd.mp4?rlkey=dhx2qkuppuoc7f44xfjyy71d2&st=iy7gdosw'
            },
            {
                id: 'como-treinar-o-seu-dragao-3',
                title: 'Como Treinar o Seu Dragão 3',
                originalTitle: 'How to Train Your Dragon: The Hidden World',
                type: 'filme',
                category: 'Animação, Aventura, Fantasia, Ação, Família',
                year: '2019',
                yearBR: '2019',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/05f7a467f762a37b7e3794d4ca0e1ccdc1e7abbc5a545a27a77c4540c078d505.jpg',
                description: 'Soluço, agora líder de Berk, enfrenta um novo inimigo que ameaça os dragões. Ao mesmo tempo, Banguela conhece uma fêmea de sua espécie, levando Soluço a tomar uma difícil decisão para proteger seus amigos e o futuro dos dragões.',
                ageRating: 'L',
                distributor: 'Universal Pictures',
                production: 'DreamWorks Animation',
                yearBRNote: '2019 (Brasil)',
                tags: ['Clássico','Família'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/iddtmfzpqwz4ottnl4ik9/Como.Treinar.Dragao.3-Hd.mp4?rlkey=v42w571a3kdm3az6p2cw8i7ek&st=vzofkz6z'
            },
            {
                id: 'superman-2025',
                title: 'Superman',
                originalTitle: 'Superman',
                type: 'filme',
                category: 'Ação, Aventura, Ficção científica, Super-herói',
                year: '2025',
                yearBR: '2025',
                cover: 'https://i0.wp.com/www.crossovernerd.com/wp-content/uploads/2025/07/superman-capa-scaled.jpeg?fit=2560%2C1440&ssl=1',
                description: 'Clark Kent tenta equilibrar sua herança kryptoniana com a vida humana em Smallville e Metrópolis. Enquanto usa seus poderes para proteger a Terra, ele enfrenta desconfiança do público e a ameaça de Lex Luthor, que coloca em risco tudo o que Superman representa.',
                ageRating: '14',
                duration: 129,
                distributor: 'Warner Bros. Pictures',
                production: 'DC Studios / Troll Court Entertainment / The Safran Company',
                director: 'James Gunn',
                writer: 'James Gunn',
                cast: ['David Corenswet','Rachel Brosnahan','Nicholas Hoult','Nathan Fillion','Isabela Merced','Edi Gathegi'],
                tags: ['Lançamento','Gods and Monsters'],
                notes: 'Estreia no Brasil em 10 de julho de 2025. Marca o início do novo Universo DC (DCU) dirigido por James Gunn e Peter Safran — capítulo "Gods and Monsters".',
                url: 'https://dl.dropboxusercontent.com/scl/fi/1jqpzu7n6glwqfdi3thgx/Sprman.mp4?rlkey=yb4ydorajku6bqzh6k35o4e0e&st=ym2cvjhn'
            }
        ,
            {
                id: 'descendentes-ascensao-de-copas',
                title: 'Descendentes: A Ascensão de Copas',
                originalTitle: 'Descendants: The Rise of Red',
                type: 'filme',
                category: 'Musical / Fantasia / Aventura / Família',
                year: '2024',
                yearBR: '2024',
                cover: 'https://m.media-amazon.com/images/S/pv-target-images/406504fe034c701b554907c01c4962666fc82a9710fdc5d6eb166a5fdd3ec9d4.jpg',
                description: 'Red, filha da Rainha de Copas, e Chloe, filha da Cinderela, precisam unir forças quando um golpe ameaça o reino de Auradon; elas viajam no tempo para tentar mudar o evento que levou a Rainha de Copas a se tornar vilã.',
                ageRating: 'L',
                distributor: 'Disney+ / Disney Channel',
                production: 'Disney Branded Television',
                yearBRNote: 'Lançamento em 12 de julho de 2024 no Disney+',
                tags: ['Musical','Família'],
                url: 'https://dl.dropboxusercontent.com/scl/fi/7ypz7e4092l5lhhf7r9ih/Theriseofred.mp4?rlkey=93gog1rlx8kbw55np0lu51993&st=xlkocn66'
            }
        ];

        // --- LINK OBFUSCATION (inline DB shielding) ---
        // Move any cleartext 'url' fields into 'url_enc' using a simple XOR+base64 encoder so links are not present in plain text
        (function(){
            try {
                const ENCKEY = 'lumina_enc_key_v1';

                const toUtf8 = (s) => new TextEncoder().encode(String(s || ''));
                const fromUtf8 = (u8) => new TextDecoder().decode(u8);
                const base64FromU8 = (u8) => {
                    let binary = '';
                    const chunkSize = 0x8000;
                    for (let i = 0; i < u8.length; i += chunkSize) {
                        binary += String.fromCharCode.apply(null, Array.from(u8.subarray(i, i + chunkSize)));
                    }
                    return btoa(binary);
                };
                const u8FromBase64 = (b64) => {
                    const bin = atob(String(b64));
                    const u8 = new Uint8Array(bin.length);
                    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
                    return u8;
                };
                const xorBytes = (u8, key) => {
                    const k = toUtf8(String(key || 'lumina_default_key'));
                    const out = new Uint8Array(u8.length);
                    for (let i = 0; i < u8.length; i++) out[i] = u8[i] ^ k[i % k.length];
                    return out;
                };
                function encodeStr(str, key) {
                    try {
                        const u8 = toUtf8(String(str || ''));
                        const x = xorBytes(u8, key || ENCKEY);
                        return base64FromU8(x);
                    } catch (e) { return ''; }
                }
                function decodeStr(enc, key) {
                    try {
                        if (!enc) return '';
                        const u8 = u8FromBase64(String(enc));
                        const x = xorBytes(u8, key || ENCKEY);
                        return fromUtf8(x);
                    } catch (e) { return ''; }
                }

                // helper to obfuscate urls in an object (recursive for seasons/episodes)
                function obfuscateItemUrls(item) {
                    try {
                        if (!item || typeof item !== 'object') return;
                        if (item.url && typeof item.url === 'string' && item.url.trim()) {
                            try { item.url_enc = encodeStr(item.url, ENCKEY); } catch(_) { item.url_enc = ''; }
                            try { delete item.url; } catch(_) {}
                        }
                        if (item.seasons && typeof item.seasons === 'object') {
                            Object.keys(item.seasons).forEach(s => {
                                const arr = item.seasons[s] || [];
                                if (Array.isArray(arr)) {
                                    arr.forEach(ep => {
                                        if (ep && ep.url) {
                                            try { ep.url_enc = encodeStr(ep.url, ENCKEY); } catch(_) { ep.url_enc = ''; }
                                            try { delete ep.url; } catch(_) {}
                                        }
                                    });
                                }
                            });
                        }
                        // also obfuscate any nested url fields (defensive)
                        Object.keys(item).forEach(k => {
                            try {
                                const v = item[k];
                                if (v && typeof v === 'object') obfuscateItemUrls(v);
                            } catch(_) {}
                        });
                    } catch (e) {}
                }

                // run obfuscation on the inline 'db' so the rest of the script does not contain cleartext urls
                try {
                    if (Array.isArray(window.db)) {
                        window.db.forEach(i => {
                            try { obfuscateItemUrls(i); } catch(_) {}
                        });
                    }
                } catch (e) {}
                
                // expose lightweight decode helper for runtime use by ensureDB / player flow
                window.__lumina_deobf = {
                    key: ENCKEY,
                    decode: decodeStr,
                    encode: encodeStr,
                    decodeDb: function(dbArr) {
                        try {
                            if (!Array.isArray(dbArr)) return;
                            dbArr.forEach(item => {
                                try {
                                    if (item && typeof item === 'object') {
                                        // restore top-level url if missing
                                        if (!item.url && item.url_enc) {
                                            try { item.url = decodeStr(item.url_enc, ENCKEY); } catch(_) { item.url = ''; }
                                        }
                                        if (item.seasons && typeof item.seasons === 'object') {
                                            Object.keys(item.seasons).forEach(s => {
                                                const arr = item.seasons[s] || [];
                                                if (Array.isArray(arr)) {
                                                    arr.forEach(ep => {
                                                        if (ep && !ep.url && ep.url_enc) {
                                                            try { ep.url = decodeStr(ep.url_enc, ENCKEY); } catch(_) { ep.url = ''; }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                } catch(_) {}
                            });
                        } catch (e) {}
                    }
                };
            } catch (e) {
                // silent
            }

            // Ensure any inline store created at parse-time is decoded and restored into runtime window.db immediately.
            try {
                if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function') {
                    const store = window.__db_store || window.db || null;
                    if (Array.isArray(store)) {
                        try { window.__lumina_deobf.decodeDb(store); window.db = store; }
                        catch (_) { window.db = window.db || []; }
                    } else {
                        // if no inline store, attempt to decode any existing window.db (defensive)
                        try { window.__lumina_deobf.decodeDb(window.db || []); } catch (_) {}
                    }
                }
            } catch (_) {}
        })();

        // --- DATABASE LAZY LOADER & OBFUSCATION ---
        (function(){
            try {
                // keep an immediate in-memory copy in a private slot, then clear the global 'db' reference so it isn't trivially available after JS runs
                // (the original inline db remains in source but is removed from window to make casual copy/paste harder)
                try { window.__db_store = window.db || null; } catch(_) { window.__db_store = null; }

                // ensureDB: returns the current db (prefers server-fetched obfuscated JSON if available), and populates window.db when resolved
                window.ensureDB = async function ensureDB() {
                    try {
                        // if already populated with real objects, return immediately
                        if (Array.isArray(window.db) && window.db.length > 0 && !window.__db_fetched) return window.db;
                        // try to fetch a non-cached DB JSON (server-side file /db.json). Network-first to avoid stale embedded links in client cache
                        try {
                            const res = await fetch('/db.json', { cache: 'no-store', credentials: 'same-origin' });
                            if (res && res.ok) {
                                const j = await res.json();
                                if (Array.isArray(j)) {
                                    // decode any obfuscated urls before installing into runtime store
                                    try {
                                        if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function') {
                                            window.__lumina_deobf.decodeDb(j);
                                        }
                                    } catch(_) {}
                                    window.__db_store = j;
                                }
                            }
                        } catch (e) {
                            // network failed: keep any __db_store that may have been copied from the inline db at load-time
                        }
                        // install the store into the runtime db reference and mark fetched (so we don't re-fetch on subsequent calls unless explicitly desired)
                        window.db = Array.isArray(window.__db_store) ? window.__db_store : (window.db || []);



                        window.__db_fetched = true;
                        return window.db;
                    } catch (e) {
                        // on any error, ensure window.db exists as a safe empty array
                        try { window.db = window.db || []; } catch(_) { window.db = []; }
                        return window.db;
                    }
                };

                // light-weight helper: protect direct assignments to window.db by replacing with getter that yields empty array until ensureDB runs
                try {
                    if (!window.db || (Array.isArray(window.db) && window.db.length === 0)) {
                        Object.defineProperty(window, '__db_guard', { value: true, writable: false, configurable: false });
                    }
                } catch (e) { /* ignore defineProperty errors */ }
            } catch (e) {
                /* silent fallback */
            }
        })();

        // --- STATE & LOCAL STORAGE ---
        // Reset user data on startup (clear v2 keys) to ensure a fresh state
        try {
            localStorage.removeItem('lumina_v2_favs');
            localStorage.removeItem('lumina_v2_prog');
            localStorage.removeItem('lumina_v2_hist');
        } catch (e) { /* ignore storage errors */ }

        let state = {
            favorites: JSON.parse(localStorage.getItem('lumina_v2_favs')) || [],
            progress: JSON.parse(localStorage.getItem('lumina_v2_prog')) || {}, 
            history: JSON.parse(localStorage.getItem('lumina_v2_hist')) || {}, 
            tab: 'home',
            searchQuery: '',
            pendingVideo: null
        };

        // Background timer control helpers:
        // Pause non-essential background activity when video playback is active to avoid
        // continual DOM updates/timers from starving rendering during long sessions.
        function stopHeroRotate() {
            try { if (typeof __heroRotateTimer !== 'undefined' && __heroRotateTimer) { clearInterval(__heroRotateTimer); __heroRotateTimer = null; } } catch(err) {}
        }
        function startHeroRotate() {
            try {
                // don't start if already running
                if (typeof __heroRotateTimer !== 'undefined' && __heroRotateTimer) return;
                __heroRotateTimer = setInterval(() => {
                    try {
                        heroIndex = (heroIndex + 1) % db.length;
                        // if current tab is home, update only hero area for performance
                        if (state.tab === 'home') updateHeroCard();
                    } catch (e) { /* safe guard */ }
                }, 10000);
            } catch (e) {}
        }

        function stopBadgeTimer() {
            try { if (window.__lumina_badge_timer) { clearInterval(window.__lumina_badge_timer); window.__lumina_badge_timer = null; } } catch(e){}
        }
        function startBadgeTimer() {
            try {
                if (window.__lumina_badge_timer) return;
                window.__lumina_badge_timer = setInterval(rotateTagsTick, typeof BADGE_ROTATE_INTERVAL !== 'undefined' ? BADGE_ROTATE_INTERVAL : 8000);
            } catch(e){}
        }

        // globally pause/resume background activity (safe no-op when already in desired state)
        function pauseBackgroundActivity() {
            try {
                stopHeroRotate();
                stopBadgeTimer();
                // also pause the home session rotator so Continue Assistindo isn't affected
                try { stopHomeRotator(); } catch(e){}
                // any other repeating background tasks could be paused here if needed
            } catch(e) {}
        }
        function resumeBackgroundActivity() {
            try {
                startHeroRotate();
                startBadgeTimer();
                // resume gentle home session rotation when app is active
                try { startHomeRotator(); } catch(e){}
            } catch(e) {}
        }

        //
        // Home sessions gentle rotator: cycles visible items in home carousels smoothly
        //
        (function(){
            // internal state
            window.__home_rotator = { timer: null, interval: 20000, step: 1, lastShift: 0, running: false };

            function pickRotatedList(source, offset, count) {
                if (!Array.isArray(source) || source.length === 0) return [];
                const out = [];
                const len = source.length;
                for (let i = 0; i < Math.min(count, len); i++) {
                    out.push(source[(offset + i) % len]);
                }
                return out;
            }

            function fadeReplaceGrid(gridEl, items) {
                try {
                    if (!gridEl) return;
                    // gentle fade-out -> swap -> fade-in
                    gridEl.style.transition = 'opacity 420ms ease';
                    gridEl.style.opacity = '0';
                    setTimeout(() => {
                        try {
                            gridEl.innerHTML = '';
                            // render new items into grid using existing helper
                            render16by9CatalogCards(items, gridEl);
                        } catch (e) {}
                        // fade-in
                        requestAnimationFrame(() => {
                            gridEl.style.opacity = '1';
                        });
                    }, 420);
                } catch (e) {}
            }

            window.rotateHomeSessions = function rotateHomeSessions() {
                try {
                    // Safety guards: avoid doing any DOM work when page hidden, details modal or player are open,
                    // or when a heavy task is already running. This prevents layout thrash and reduces crash risk.
                    if (document.visibilityState === 'hidden') return;
                    const detailsModal = document.getElementById('details-modal');
                    const playerModal = document.getElementById('player-modal');
                    if ((detailsModal && !detailsModal.classList.contains('hidden')) || (playerModal && !playerModal.classList.contains('hidden'))) return;

                    // Prevent overlapping execution: ensure minimum gap between runs (defensive throttle)
                    const s = window.__home_rotator;
                    const now = performance.now();
                    if (!s._lastRun) s._lastRun = 0;
                    if (now - s._lastRun < Math.max(800, (s.interval || 60000) - 1200)) {
                        // Too soon since last run — bail out to avoid work stacking
                        return;
                    }
                    s._lastRun = now;

                    // Update the rotation index in-memory only (cheap) and defer DOM updates to idle time
                    const step = s.step || 1;
                    s.lastShift = (s.lastShift + step) % Math.max(1, db.length || 1);

                    // Prepare update tasks: only compute slices now (fast), schedule DOM swap on idle/frame
                    const tasks = [];

                    // Catalog (main Trends grid)
                    const catalogGrid = document.getElementById('catalog-grid');
                    if (catalogGrid) {
                        const items = pickRotatedList(db, s.lastShift, 16);
                        tasks.push(() => fadeReplaceGrid(catalogGrid, items));
                    }

                    // Novidades
                    const newGrid = document.getElementById('section-new-grid');
                    if (newGrid) {
                        const items = pickRotatedList(db, s.lastShift + 3, 8);
                        tasks.push(() => fadeReplaceGrid(newGrid, items));
                    }

                    // Comédias (category-based)
                    const comedyGrid = document.getElementById('section-comedy-grid');
                    if (comedyGrid) {
                        const pool = db.filter(i => (i.category || '').toLowerCase().includes('comédia') || (i.category || '').toLowerCase().includes('comedia'));
                        const items = pickRotatedList(pool.length ? pool : db, s.lastShift + 6, 8);
                        tasks.push(() => fadeReplaceGrid(comedyGrid, items));
                    }

                    // Recomendados para você: build pool from user's favorites genres; fallback to rating-based
                    const recoGrid = document.getElementById('section-reco-grid');
                    if (recoGrid) {
                        try {
                            const favGenres = new Set();
                            (state.favorites || []).forEach(fid => {
                                try {
                                    const f = db.find(d => d.id === fid);
                                    if (!f || !f.category) return;
                                    f.category.split(/[,\/]| e | & /i).forEach(g => {
                                        const ng = String(g || '').toLowerCase().trim();
                                        if (ng) favGenres.add(ng);
                                    });
                                } catch(_) {}
                            });

                            let pool = [];
                            if (favGenres.size > 0) {
                                const favArr = Array.from(favGenres);
                                pool = db.filter(item => {
                                    try {
                                        const cat = (item.category || '').toLowerCase();
                                        if (favArr.some(g => g && cat.includes(g))) return true;
                                        const title = (item.title || '').toLowerCase();
                                        if (item.tags && item.tags.some(t => favArr.some(g => String(t).toLowerCase().includes(g)))) return true;
                                        if (favArr.some(g => title.includes(g))) return true;
                                        return false;
                                    } catch (e) { return false; }
                                });
                            }

                            if (!Array.isArray(pool) || pool.length < 6) pool = db.slice().sort((a,b) => (b.ratings?.imdb||0) - (a.ratings?.imdb||0));
                            const items = pickRotatedList(pool.length ? pool : db, s.lastShift + 9, 8);
                            tasks.push(() => fadeReplaceGrid(recoGrid, items));
                        } catch (err) {
                            const pool = db.slice().sort((a,b) => (b.ratings?.imdb||0) - (a.ratings?.imdb||0));
                            const items = pickRotatedList(pool, s.lastShift + 9, 8);
                            tasks.push(() => fadeReplaceGrid(recoGrid, items));
                        }
                    }

                    // Run DOM updates opportunistically using requestIdleCallback if available, otherwise a requestAnimationFrame fallback.
                    const runUpdates = () => {
                        try {
                            // run one task at a time to keep frames light
                            for (let i = 0; i < tasks.length; i++) {
                                try { tasks[i](); } catch (_) {}
                            }
                        } catch (e) { /* ignore */ }
                    };

                    if (typeof requestIdleCallback === 'function') {
                        requestIdleCallback(() => {
                            // Re-check visibility and modals right before mutating DOM to avoid wasted work
                            if (document.visibilityState === 'hidden') return;
                            if ((detailsModal && !detailsModal.classList.contains('hidden')) || (playerModal && !playerModal.classList.contains('hidden'))) return;
                            runUpdates();
                        }, { timeout: 900 });
                    } else {
                        // Use RAF as a safe fallback: perform updates in next frame
                        requestAnimationFrame(() => {
                            if (document.visibilityState === 'hidden') return;
                            if ((detailsModal && !detailsModal.classList.contains('hidden')) || (playerModal && !playerModal.classList.contains('hidden'))) return;
                            runUpdates();
                        });
                    }
                } catch (e) {
                    // ignore rotation errors and avoid noisy logs in production
                    try { console.warn && console.warn('rotateHomeSessions error', e); } catch(_) {}
                }
            };

            window.startHomeRotator = function startHomeRotator() {
                try {
                    const s = window.__home_rotator;
                    if (s.running) return;
                    s.running = true;
                    // run initially after a slight delay to let initial render settle
                    s.timer = setInterval(() => {
                        try { window.rotateHomeSessions(); } catch(e){};
                    }, s.interval);
                    // do a first gentle tick after 750ms so user sees initial content then rotation
                    setTimeout(() => { try { window.rotateHomeSessions(); } catch(e){} }, 750);
                } catch (e) {}
            };

            window.stopHomeRotator = function stopHomeRotator() {
                try {
                    const s = window.__home_rotator;
                    if (s.timer) { clearInterval(s.timer); s.timer = null; }
                    s.running = false;
                } catch (e) {}
            };

            // keep the rotator paused while playback is active by listening for player open/close signals
            // start automatically when the script loads but actual start is controlled by resumeBackgroundActivity()
            // expose functions globally for testing/debugging.
        })();

        // Small safe DOM utility (named 'doom' per request) to avoid crashes when querying elements
        const doom = (sel, root = document) => {
            try { return root.querySelector(sel); } catch (e) { return null; }
        };
        const doomAll = (sel, root = document) => {
            try { return Array.from(root.querySelectorAll(sel)); } catch (e) { return []; }
        };

        // Convenience wrappers to make code clearer and slightly faster (fewer lookups and safer calls)
        // byId / bySel reduce repeated string building and centralize null-safety.
        const byId = (id) => doom('#' + id);
        const bySel = (sel, root) => doom(sel, root);
        const allSel = (sel, root) => doomAll(sel, root);

        // Small helper to safely set innerHTML without throwing when node missing
        const safeSetHTML = (id, html) => {
            const el = byId(id);
            if (el) el.innerHTML = html;
        };

        // Safe event attach (no-op when element missing)
        const safeOn = (id, evt, fn) => {
            const el = byId(id);
            if (el && typeof fn === 'function') el.addEventListener(evt, fn);
        };

        // Debounced + capped localStorage writer to avoid flooding storage and crashing the page.
        // This version merges with existing stored progress to prevent accidental regressions
        // (never overwrite a newer/further progress entry with an older/empty one).
        let __saveProgressTimer = null;

        // Immediate flush helper: writes current state.progress and state.history to localStorage synchronously.
        function flushProgressNow() {
            try {
                // read current stored snapshot to merge safely (best-effort)
                let stored = {};
                try {
                    const raw = localStorage.getItem('lumina_v2_prog');
                    if (raw) stored = JSON.parse(raw) || {};
                } catch (e) {
                    stored = {};
                }

                // Merge algorithm (same as debounced saver) to avoid regressions
                const merged = Object.assign({}, stored);
                const now = Date.now();
                const incoming = state.progress || {};
                Object.keys(incoming).forEach(id => {
                    try {
                        const inc = incoming[id] || {};
                        const prev = merged[id] || {};
                        const prevTime = (typeof prev.time === 'number') ? prev.time : (prev.time ? Number(prev.time) : -1);
                        const incTime = (typeof inc.time === 'number') ? inc.time : (inc.time ? Number(inc.time) : -1);
                        const prevTs = prev.timestamp || 0;
                        const incTs = inc.timestamp || now;

                        let keep = prev;
                        if (incTs > prevTs) {
                            keep = inc;
                        } else if (incTs === prevTs) {
                            if (incTime >= 0 && prevTime >= 0) keep = (incTime >= prevTime) ? inc : prev;
                            else keep = incTime >= 0 ? inc : prev;
                        } else {
                            if (incTime >= 0 && prevTime < 0) keep = inc;
                            else keep = prev;
                        }

                        const out = Object.assign({}, prev, inc, keep);
                        out.timestamp = Math.max(prevTs || 0, incTs || now);
                        if (out.time != null) out.time = Number(out.time);
                        if (out.duration != null) out.duration = Number(out.duration);

                        merged[id] = out;
                    } catch (e) {
                        merged[id] = incoming[id];
                    }
                });

                // Cap entries to most recent 200
                const entries = Object.entries(merged || {});
                let final = merged;
                if (entries.length > 200) {
                    entries.sort((a, b) => {
                        const ta = (a[1] && a[1].timestamp) || 0;
                        const tb = (b[1] && b[1].timestamp) || 0;
                        return tb - ta;
                    });
                    final = Object.fromEntries(entries.slice(0, 200));
                }

                // Synchronously write both progress and history
                try { localStorage.setItem('lumina_v2_prog', JSON.stringify(final)); } catch (e) { /* ignore write errors */ }
                try { localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {})); } catch (e) { /* ignore */ }

                // reflect the merged snapshot back into memory so subsequent operations use same data
                state.progress = final;
            } catch (e) {
                // best-effort fallback: try direct write of in-memory objects
                try { localStorage.setItem('lumina_v2_prog', JSON.stringify(state.progress || {})); } catch (_) {}
                try { localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {})); } catch (_) {}
            }
        }

        // Debounced saver (keeps previous behavior for frequent updates)
        function saveProgressData() {
            if (__saveProgressTimer) clearTimeout(__saveProgressTimer);
            __saveProgressTimer = setTimeout(() => {
                try { flushProgressNow(); } catch (e) {}
                __saveProgressTimer = null;
            }, 300);
        }

        // helper: detect if URL is direct video file (or youtube embed)
        let __youtubeApiLoaded = false;
        let __youtubeApiLoading = false;
        function loadYouTubeAPIIfNeeded() {
            if(__youtubeApiLoaded || __youtubeApiLoading) return;
            __youtubeApiLoading = true;
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            tag.async = true;
            document.head.appendChild(tag);
            // The API sets window.onYouTubeIframeAPIReady; we'll mark loaded when available
            window.onYouTubeIframeAPIReady = function() {
                __youtubeApiLoaded = true;
                __youtubeApiLoading = false;
            };
        }
        function isDirectVideo(url) {
            if(!url) return false;
            try {
                const u = url.split('?')[0].toLowerCase();
                if (/\.(mp4|webm|m3u8|mov|ogg)$/i.test(u)) return true;
                // treat raw youtube embed links as non-direct (handled specially via YT API elsewhere)
                return false;
            } catch (e) { return false; }
        }
        function isYouTubeEmbed(url) {
            if(!url) return false;
            try {
                return /youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=/.test(url);
            } catch(e) { return false; }
        }

        // --- CORE UI ---
        // rotating hero index to cycle top highlight periodically
        let heroIndex = 0;
        let __heroRotateTimer = null;
        async function init() { 
            // ensure database loaded lazily and not left on global scope for casual scraping
            try { await ensureDB(); } catch(_) { /* proceed even if ensureDB fails */ }

            renderView();
            insertLegalFooter();
            // handle incoming share links via query string (ensure we have a DB for mapping)
            try { await handleSharedQuery && handleSharedQuery(); } catch(e) {}
            // start rotation: change hero every 10s (use helper to allow pausing during playback)
            startHeroRotate();
        }

        // Smooth tab switching with light fade/slide and render debounce to avoid layout thrash
        let __switchTabTimer = null;
        function switchTab(tab, clearSearch = true) {
            if (state.tab === tab && clearSearch) return; // no-op if same tab
            state.tab = tab;

            if (clearSearch) {
                state.searchQuery = '';
                const dSearch = document.getElementById('desktop-search');
                if (dSearch) dSearch.value = '';
            }

            // Update Desktop Nav
            const dTabs = {
                'home': document.getElementById('tab-home-desktop'),
                'favorites': document.getElementById('tab-fav-desktop')
            };
            Object.keys(dTabs).forEach(k => {
                if (dTabs[k]) dTabs[k].className = k === tab ? 'text-white font-medium text-sm transition-all' : 'text-white/50 hover:text-white font-medium text-sm transition-all';
            });

            // Update Mobile Nav
            const mTabs = {
                'home': { el: document.getElementById('tab-home-mobile'), icon: 'ph-house' },
                'search': { el: document.getElementById('tab-search-mobile'), icon: 'ph-magnifying-glass' },
                'favorites': { el: document.getElementById('tab-fav-mobile'), icon: 'ph-bookmark-simple' }
            };
            Object.keys(mTabs).forEach(k => {
                if (mTabs[k].el) {
                    const isActive = k === tab;
                    mTabs[k].el.className = `flex flex-col items-center gap-1 w-16 transition-all ${isActive ? 'text-white scale-110' : 'text-white/40 hover:text-white'}`;
                    mTabs[k].el.querySelector('i').className = `${isActive ? 'ph-fill' : 'ph'} ${mTabs[k].icon} text-2xl mb-0.5`;
                }
            });

            // Animate container out, then render new view and animate in
            const container = document.getElementById('main-content');
            if (!container) return;

            // If a previous timer exists, clear it to avoid race conditions
            if (__switchTabTimer) clearTimeout(__switchTabTimer);

            // start exit animation
            container.classList.add('tab-exit');

            // after CSS transition, render and animate enter
            __switchTabTimer = setTimeout(() => {
                container.classList.remove('tab-exit');
                container.classList.add('tab-enter');
                renderView();
                insertLegalFooter();
                // force reflow so transition picks up
                container.getBoundingClientRect();
                container.classList.add('tab-enter-active');

                // cleanup enter classes after transition
                setTimeout(() => {
                    container.classList.remove('tab-enter', 'tab-enter-active');
                }, 350);
                if (clearSearch) window.scrollTo({ top: 0, behavior: 'smooth' });
                __switchTabTimer = null;
            }, 180);
        }

        // Debounced search to avoid excessive renders while typing
        let __searchDebounce = null;
        function handleSearch(query) {
            state.searchQuery = query;
            if (__searchDebounce) clearTimeout(__searchDebounce);
            __searchDebounce = setTimeout(() => {
                if (query.trim().length > 0) {
                    if (state.tab !== 'search') switchTab('search', false);
                    else renderView();
                } else {
                    switchTab('home');
                }
                __searchDebounce = null;
            }, 1000);
        }

        function renderView() {
            const container = document.getElementById('main-content');
            container.innerHTML = ''; 
            try { container.scrollTo({ top: 0, behavior: 'auto' }); } catch(e) { container.scrollTop = 0; }
            
            if (state.tab === 'search') {
                // normalize function: strip diacritics and collapse non-alphanum to single space for safer comparisons
                const normalizeText = function(s) {
                    if (!s) return '';
                    return String(s).toLowerCase()
                        .normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
                        .replace(/[^a-z0-9]+/g,' ')
                        .trim();
                };

                // simple Levenshtein distance for fuzzy tolerances
                const levenshtein = function(a, b) {
                    if (a === b) return 0;
                    const an = a ? a.length : 0;
                    const bn = b ? b.length : 0;
                    if (an === 0) return bn;
                    if (bn === 0) return an;
                    const matrix = [];
                    for (let i = 0; i <= bn; i++) { matrix[i] = [i]; }
                    for (let j = 0; j <= an; j++) { matrix[0][j] = j; }
                    for (let i = 1; i <= bn; i++) {
                        for (let j = 1; j <= an; j++) {
                            const cost = b.charAt(i-1) === a.charAt(j-1) ? 0 : 1;
                            matrix[i][j] = Math.min(
                                matrix[i-1][j] + 1,
                                matrix[i][j-1] + 1,
                                matrix[i-1][j-1] + cost
                            );
                        }
                    }
                    return matrix[bn][an];
                };

                const rawQuery = (state.searchQuery || '').trim();
                const nQuery = normalizeText(rawQuery);

                // If query is empty, show no results and prompt (keeps behavior consistent)
                if (!nQuery) {
                    container.innerHTML = `
                        <div class="pt-24 md:pt-32 px-6 md:px-16 min-h-screen animate-fade-in">
                            
                            <!-- Mobile Search Input (Visible only on mobile) -->
                            <div class="relative w-full mb-8 md:hidden">
                                <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl"></i>
                                <input type="text" id="mobile-search" placeholder="Buscar filmes e séries..." class="w-full bg-surface border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-sm" oninput="handleSearch(this.value)" value="${state.searchQuery}" autofocus>
                            </div>

                            <div class="flex flex-col items-center justify-center py-12 text-center">
                                <i class="ph ph-magnifying-glass text-4xl text-white/20 mb-4"></i>
                                <h2 class="text-lg font-medium text-white mb-1">Comece a digitar para buscar</h2>
                                <p class="text-white/50 text-sm">Digite o nome de filmes, séries ou gêneros para pesquisar por títulos.</p>
                            </div>
                        </div>
                    `;
                    // focus mobile input if present
                    setTimeout(() => {
                        try { const mInput = document.getElementById('mobile-search'); if (mInput && window.innerWidth < 768) mInput.focus(); } catch(_) {}
                    }, 120);
                } else {
                    // First: try an exact title match (ignores accents, case, multiple spaces) and return only that item if found.
                    // This ensures searching an exact title yields a single precise result.
                    const exactMatch = db.find(item => {
                        try {
                            const t = normalizeText(item.title || item.originalTitle || '');
                            // also allow exact match against normalized originalTitle or id
                            const o = normalizeText(item.originalTitle || '');
                            const idnorm = normalizeText(item.id || '');
                            return (t === nQuery) || (o === nQuery) || (idnorm === nQuery);
                        } catch (e) { return false; }
                    });

                    let results = [];
                    if (exactMatch) {
                        results = [exactMatch];
                    } else {
                        // Fuzzy / broad search: preserve previous tolerant behavior but slightly more forgiving:
                        // - ignore accents/case/spaces via normalizeText
                        // - token-wise fuzzy matching with ~30% tolerance per token
                        results = db.filter(item => {
                            try {
                                const title = normalizeText(item.title || item.originalTitle || '');
                                const category = normalizeText(item.category || '');
                                // direct contains match on normalized strings (ignores accents and punctuation)
                                if (title.includes(nQuery) || category.includes(nQuery)) return true;

                                // allow small typos: compute token-wise distance; accept if small relative to token length
                                const qTokens = nQuery.split(/\s+/).filter(Boolean);
                                const tTokens = title.split(/\s+/).filter(Boolean);
                                for (let qt of qTokens) {
                                    for (let tt of tTokens) {
                                        const dist = levenshtein(qt, tt);
                                        const maxAllowed = Math.max(1, Math.floor(tt.length * 0.30)); // allow ~30% char typos (min 1)
                                        if (dist <= maxAllowed) return true;
                                    }
                                }

                                // also allow partial starts (user typed beginning of a token)
                                for (let qt of qTokens) {
                                    if (tTokens.some(tt => tt.startsWith(qt))) return true;
                                }

                                return false;
                            } catch (e) { return false; }
                        });
                    }

                    // Render results
                    container.innerHTML = `
                        <div class="pt-24 md:pt-32 px-6 md:px-16 min-h-screen animate-fade-in">
                            
                            <!-- Mobile Search Input (Visible only on mobile) -->
                            <div class="relative w-full mb-8 md:hidden">
                                <i class="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl"></i>
                                <input type="text" id="mobile-search" placeholder="Buscar filmes e séries..." class="w-full bg-surface border border-white/10 rounded-full py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/30 text-sm" oninput="handleSearch(this.value)" value="${state.searchQuery}" autofocus>
                            </div>

                            <h1 class="text-2xl md:text-3xl font-display font-bold text-white mb-2">Busca</h1>
                            <p class="text-white/50 text-sm mb-8">Resultados para "${state.searchQuery}"</p>
                            
                            ${results.length === 0 ? `
                                <div class="flex flex-col items-center justify-center py-20 text-center">
                                    <i class="ph ph-magnifying-glass text-4xl text-white/20 mb-4"></i>
                                    <h2 class="text-lg font-medium text-white mb-1">Nenhum resultado</h2>
                                    <p class="text-white/50 text-sm">Tente buscar por outro título ou gênero.</p>
                                </div>
                            ` : `
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" id="search-grid"></div>
                            `}
                        </div>
                    `;
                    
                    if(results.length > 0) render16by9CatalogCards(results, document.getElementById('search-grid'));
                }

                // Focus mobile input if it's rendered
                const mInput = document.getElementById('mobile-search');
                if (mInput && window.innerWidth < 768 && !state.searchQuery) mInput.focus();

            } else if (state.tab === 'home') {
                const continueItems = getContinueWatching();
                const heroItem = db[heroIndex] || db[0]; 
                
                let html = `
                    <div class="relative w-full h-[75vh] md:h-[85vh] flex items-end pb-12 md:pb-24 pt-32 px-6 md:px-16 animate-fade-in group cursor-pointer" onclick="openDetails('${heroItem.id}')">
                        <div class="absolute inset-0 bg-surface">
                            <img src="${heroItem.cover}" class="w-full h-full object-cover opacity-50 hero-cover-no-scale" onload="this.classList.add('loaded')">
                            <div class="absolute inset-0 fade-right"></div>
                            <div class="absolute inset-0 fade-bottom"></div>
                        </div>
                        
                        <div class="relative z-10 w-full max-w-2xl">
                            <span class="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest uppercase text-black bg-white rounded-sm">${heroItem.type === 'serie' ? 'Série' : 'Filme'}</span>
                            <h1 class="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">${heroItem.title}</h1>
                            <p class="text-white/70 text-sm md:text-base mb-8 line-clamp-3 md:line-clamp-none max-w-xl">${heroItem.description}</p>
                            
                            <div class="flex items-center gap-3">
                                <button onclick="event.stopPropagation(); openDetails('${heroItem.id}')" class="bg-white text-black px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    <i class="ph-fill ph-play text-lg"></i> Detalhes
                                </button>
                                <button onclick="toggleFav(event, '${heroItem.id}')" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                    <i class="${state.favorites.includes(heroItem.id) ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                if(continueItems.length > 0) {
                    html += `
                        <div class="px-6 md:px-16 -mt-10 relative z-20 mb-12 animate-slide-up session-wrap" style="animation-delay: 0.1s">
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="text-lg font-display font-medium text-white">Continuar Assistindo</h2>
                                <!-- mobile toggle omitted for continue (always open on mobile) -->
                            </div>

                            <div class="relative">
                                <button class="session-arrow left" aria-label="scroll-left" onclick="scrollCards('continue-grid', -1)">
                                    <i class="ph ph-caret-left text-2xl"></i>
                                </button>
                                <div id="continue-grid" class="session-scroll hide-scroll session-body"></div>
                                <button class="session-arrow right" aria-label="scroll-right" onclick="scrollCards('continue-grid', 1)">
                                    <i class="ph ph-caret-right text-2xl"></i>
                                </button>
                            </div>

                        </div>
                    `;
                }

                html += `
                    <div class="px-6 md:px-16 relative z-20 mb-20 animate-slide-up session-wrap ${window.innerWidth <= 767 ? 'mobile-collapsed' : ''}" style="animation-delay: 0.2s" id="section-trends">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-display font-medium text-white">Tendências</h2>
                            <!-- mobile toggle button -->
                            <button class="mobile-toggle-btn md:hidden" onclick="toggleSectionMobile('section-trends')">
                                <i class="ph ph-caret-down text-white/60"></i>
                                <span class="text-white/70 text-sm">Abrir</span>
                            </button>
                        </div>

                        <div class="relative session-body">
                            <button class="session-arrow left" aria-label="trends-left" onclick="scrollCards('catalog-grid', -1)">
                                <i class="ph ph-caret-left text-2xl"></i>
                            </button>
                            <div id="catalog-grid" class="session-scroll grid-auto-fit"></div>
                            <button class="session-arrow right" aria-label="trends-right" onclick="scrollCards('catalog-grid', 1)">
                                <i class="ph ph-caret-right text-2xl"></i>
                            </button>
                        </div>
                    </div>
                `;

                container.innerHTML = html;

                if(continueItems.length > 0) renderContinueCards(continueItems, document.getElementById('continue-grid'));
                render16by9CatalogCards(db, document.getElementById('catalog-grid'));

                // Inject additional curated sessions below Trends (Novidades, Comédias, Recomendados)
                insertAdditionalSections();

            } else if (state.tab === 'favorites') {
                const favData = db.filter(item => state.favorites.includes(item.id));
                container.innerHTML = `
                    <div class="pt-24 md:pt-32 px-6 md:px-16 min-h-screen animate-fade-in">
                        <h1 class="text-2xl md:text-3xl font-display font-bold text-white mb-8">Minha Lista</h1>
                        ${favData.length === 0 ? `
                            <div class="flex flex-col items-center justify-center py-20 text-center">
                                <div class="w-20 h-20 rounded-full glass flex items-center justify-center mb-6">
                                    <i class="ph ph-bookmark-simple text-3xl text-white/30"></i>
                                </div>
                                <h2 class="text-xl font-medium text-white mb-2">Sua lista está vazia</h2>
                                <p class="text-white/50 text-sm">Adicione filmes e séries para assistir mais tarde.</p>
                            </div>
                        ` : `
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" id="fav-grid"></div>
                        `}
                    </div>
                `;
                if(favData.length > 0) render16by9CatalogCards(favData, document.getElementById('fav-grid'));
            }
        }

        function getContinueWatching() {
            const items = [];
            // Helper: decide if a film/prog entry is meaningful to show
            const filmShouldShow = (prog) => {
                if (!prog) return false;
                // always show completed markers or embeds
                if (prog.completed === true) return true;
                if (prog.embed) return true;
                // show short progress that indicates user started (>= 2s) and not already at EOF
                if (typeof prog.time === 'number' && prog.time >= 2) {
                    // if duration available, avoid showing tiny fraction near zero or already finished
                    if (typeof prog.duration === 'number' && prog.duration > 0) {
                        if (prog.time < prog.duration - 6) return true;
                        // allow near-complete entries if not explicitly marked completed
                        return prog.time < prog.duration;
                    }
                    return true;
                }
                return false;
            };

            // Films: include when filmShouldShow is true
            db.filter(i => i.type === 'filme').forEach(f => {
                const filmKey = f.id_ep || f.id;
                const prog = state.progress[filmKey];
                if (!prog) return;
                if (filmShouldShow(prog)) {
                    // ensure we expose a timestamp for sorting, falling back to now if absent
                    const safeProg = Object.assign({}, prog, { timestamp: prog.timestamp || Date.now() });
                    items.push(Object.assign({}, f, { _prog: safeProg }));
                }
            });

            // Series: include when there is history or progress; prefer progress timestamps but fall back to history timestamp
            db.filter(i => i.type === 'serie').forEach(s => {
                const hist = state.history[s.id];
                const histTs = hist && hist.timestamp ? hist.timestamp : 0;
                if (hist) {
                    const epProg = state.progress[hist.epId];
                    const safeProg = epProg ? Object.assign({}, epProg, { timestamp: epProg.timestamp || histTs || Date.now() }) : { timestamp: histTs || Date.now(), embed: true };
                    items.push(Object.assign({}, s, { _prog: safeProg, _hist: hist }));
                } else {
                    // also include if there exists per-episode progress even without top-level history
                    // look for any progress keys that reference this series id pattern
                    try {
                        const keys = Object.keys(state.progress || {});
                        for (const k of keys) {
                            if (String(k).indexOf(`${s.id}-s`) === 0) {
                                const p = state.progress[k];
                                if (p && (p.time >= 2 || p.completed)) {
                                    const safeP = Object.assign({}, p, { timestamp: p.timestamp || Date.now() });
                                    items.push(Object.assign({}, s, { _prog: safeP, _hist: { s: null, e: null, epId: k, timestamp: safeP.timestamp } }));
                                    break;
                                }
                            }
                        }
                    } catch (e) { /* ignore */ }
                }
            });

            // Sort by most-recent activity (timestamp) descending; ensure numeric fallback to zero
            items.sort((a, b) => {
                const ta = (a._prog && Number(a._prog.timestamp)) || 0;
                const tb = (b._prog && Number(b._prog.timestamp)) || 0;
                return tb - ta;
            });

            return items;
        }

        function getAgeBadge(rating) {
            let color = 'bg-surface text-white border border-white/10';
            if(rating === 'L') color = 'bg-green-600/20 text-green-400 border border-green-600/30';
            if(rating === '10') color = 'bg-blue-600/20 text-blue-400 border border-blue-600/30';
            if(rating === '12') color = 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30';
            if(rating === '14') color = 'bg-orange-600/20 text-orange-400 border border-orange-600/30';
            if(['16','18'].includes(rating)) color = 'bg-red-600/20 text-red-400 border border-red-600/30';
            return `<span class="${color} text-[10px] font-bold px-1.5 py-0.5 rounded-sm">${rating}</span>`;
        }

        // Horizontal Scroll Cards for "Continue Watching"
        function renderContinueCards(data, container) {
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'w-64 md:w-80 shrink-0 hover-card cursor-pointer group';
                card.onclick = () => openDetails(item.id);
                
                // defensive: handle missing _prog or duration to avoid NaN and ensure visible fraction is correct
                const progTime = item._prog && typeof item._prog.time === 'number' ? item._prog.time : 0;
                const progDur = item._prog && typeof item._prog.duration === 'number' ? item._prog.duration : 0;
                const pct = progDur > 0 ? Math.min(100, (progTime / progDur) * 100) : (progTime > 0 ? 2 : 0);
                const subtitle = item._hist ? `T${item._hist.s} : E${item._hist.e+1}` : 'Continuar filme';

                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
                            <div class="h-full bg-accent" style="width: ${pct}%"></div>
                        </div>
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <p class="text-white/50 text-[11px] mt-0.5">${subtitle}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Grid 16:9 Cards for Catalog & Search
        function render16by9CatalogCards(data, container) {
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'hover-card cursor-pointer group relative';
                card.onclick = () => openDetails(item.id);
                
                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl md:rounded-2xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <!-- Play Icon Hover -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <div class="flex items-center gap-2 mt-0.5">
                            ${getAgeBadge(item.ageRating)}
                            <p class="text-white/40 text-[11px] truncate">${item.category}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function toggleFav(event, id) {
            event.stopPropagation();
            const index = state.favorites.indexOf(id);
            const becameRemoved = index > -1;
            if (becameRemoved) state.favorites.splice(index, 1);
            else state.favorites.push(id);
            
            // persist safely and debounce handled elsewhere
            try { localStorage.setItem('lumina_v2_favs', JSON.stringify(state.favorites)); } catch(e) {}
            
            // Visual feedback: animate the button(s)
            const animateButton = (btn) => {
                if(!btn) return;
                btn.classList.remove('pop-anim');
                // force reflow to restart animation
                void btn.offsetWidth;
                btn.classList.add('pop-anim');
                setTimeout(() => btn.classList.remove('pop-anim'), 420);
            };

            // Update any fav button inside details modal if open
            const modal = document.getElementById('details-modal');
            const isFavNow = state.favorites.includes(id);
            if (!modal.classList.contains('hidden')) {
                const favBtn = document.getElementById(`fav-btn-${id}`);
                if (favBtn) {
                    favBtn.innerHTML = `<i class="${isFavNow ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>`;
                    animateButton(favBtn);
                }
            }

            // Also update global UI (e.g., the nav or lists) by re-rendering smaller part
            // quick attempt: flip icons where present (cards will re-render on next view, but update visible quick-controls)
            // find any top-level card buttons with matching id and update
            const existBtns = document.querySelectorAll(`#fav-btn-${id}`);
            existBtns.forEach(b => {
                b.innerHTML = `<i class="${isFavNow ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>`;
                animateButton(b);
            });

            // if modal is not open, rerender view to update lists
            if (modal.classList.contains('hidden')) {
                renderView();
            }
        }

        // --- SHARE VIA QUERY STRING ---
        function buildShareLinkForContext(itemId, context = {}) {
            // create a human-friendly slug for sharing (prefer explicit id; fall back to normalized title)
            const normalize = (s) => {
                if (!s) return '';
                return String(s).toLowerCase()
                    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '') // remove diacritics
                    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            };

            try {
                const base = window.location.origin + window.location.pathname;
                const url = new URL(base);

                // prefer original id (if looks like a good slug), otherwise normalize title-like strings
                const raw = String(itemId || '');
                const candidate = raw.length > 0 && /^[a-z0-9\-\_]+$/i.test(raw) ? raw : normalize(raw);
                // if itemId equals a DB id, use it; otherwise attempt to map to DB title
                let finalSlug = candidate;
                try {
                    const found = db.find(i => i.id === raw || normalize(i.id) === normalize(raw) || normalize(i.title) === normalize(raw) || normalize(i.originalTitle) === normalize(raw));
                    if (found && found.id) finalSlug = found.id;
                } catch(_) {}

                url.searchParams.set('share', finalSlug);

                if (context && typeof context.season !== 'undefined' && context.season !== null) url.searchParams.set('s', String(context.season));
                if (context && typeof context.episode !== 'undefined' && context.episode !== null) url.searchParams.set('e', String(context.episode));
                // Friendly URL - do not encode unnecessary characters in the slug
                return url.toString();
            } catch (e) {
                try {
                    const url = new URL(window.location.href);
                    url.searchParams.set('share', String(itemId));
                    if (context.season != null) url.searchParams.set('s', String(context.season));
                    if (context.episode != null) url.searchParams.set('e', String(context.episode));
                    return url.toString();
                } catch (_) {
                    return window.location.href;
                }
            }
        }

        async function copyToClipboard(text) {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                    return true;
                } else {
                    // fallback
                    const ta = document.createElement('textarea');
                    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px';
                    document.body.appendChild(ta); ta.select();
                    document.execCommand('copy'); ta.remove();
                    return true;
                }
            } catch (e) {
                return false;
            }
        }

        function shareItemById(id, context = {}) {
            const link = buildShareLinkForContext(id, context);

            // Prefer native share dialog when available; share only the URL (no title/text)
            if (navigator.share) {
                try {
                    navigator.share({ url: link }).then(() => {
                        try { history.replaceState(null, '', link); } catch(_) {}
                    }).catch(async () => {
                        // on failure or cancel, silently copy the link to clipboard and give minimal button feedback
                        const ok = await copyToClipboard(link);
                        const btn = document.getElementById(`share-btn-${id}`);
                        if (ok && btn) {
                            const prev = btn.innerHTML;
                            btn.innerText = 'Copiado!';
                            setTimeout(() => { if (btn) btn.innerHTML = prev; }, 1400);
                        }
                        try { history.replaceState(null, '', link); } catch(_) {}
                    });
                } catch (e) {
                    // fallback: attempt to copy the link to clipboard (no alerts or modals)
                    copyToClipboard(link).then(ok => {
                        const btn = document.getElementById(`share-btn-${id}`);
                        if (ok && btn) {
                            const prev = btn.innerHTML;
                            btn.innerText = 'Copiado!';
                            setTimeout(() => { if (btn) btn.innerHTML = prev; }, 1400);
                        }
                        try { history.replaceState(null, '', link); } catch(_) {}
                    });
                }
            } else {
                // If Web Share API not available, just copy link to clipboard silently and show minimal button feedback
                copyToClipboard(link).then(ok => {
                    const btn = document.getElementById(`share-btn-${id}`);
                    if (ok && btn) {
                        const prev = btn.innerHTML;
                        btn.innerText = 'Copiado!';
                        setTimeout(() => { if (btn) btn.innerHTML = prev; }, 1400);
                    }
                    try { history.replaceState(null, '', link); } catch(_) {}
                });
            }
        }



        // on app init, check for share query and open corresponding details (supports s/e for series)
        function handleSharedQuery() {
            try {
                const params = new URLSearchParams(window.location.search || window.location.hash.replace('#','?'));
                const shareRaw = params.get('share');
                if (!shareRaw) return;

                const shareId = decodeURIComponent(String(shareRaw)).trim();

                // Normalization helper to compare slugs/titles
                const normalize = (s) => {
                    if (!s) return '';
                    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                };

                // Try direct id match first (most common)
                let item = db.find(i => i.id === shareId);

                // If not found, try normalized-id (in case user passed title or slight variant)
                if (!item) {
                    const normTarget = normalize(shareId);
                    item = db.find(i => normalize(i.id) === normTarget || normalize(i.title) === normTarget || normalize(i.originalTitle) === normTarget);
                }

                if (!item) return;

                // If season/episode query present, apply to history so details modal shows correct "continuar" and selection
                const sRaw = params.get('s'), eRaw = params.get('e');
                const s = sRaw != null ? parseInt(sRaw, 10) : null;
                const e = eRaw != null ? parseInt(eRaw, 10) : null;

                if (item.type === 'serie' && s !== null && !isNaN(s) && e !== null && !isNaN(e)) {
                    const seasonArr = item.seasons && item.seasons[s] ? item.seasons[s] : [];
                    const ep = seasonArr[e] || seasonArr[0] || null;
                    // ensure a stable episode id even when source lacks an explicit id (use seriesId-s{season}-e{episode})
                    const epId = ep && ep.id ? ep.id : (ep ? `${item.id}-s${s}-e${e}` : null);
                    state.history[item.id] = { s: s, e: e, epId: epId, timestamp: Date.now() };
                }

                // Ensure UI is ready: open home and then details; small delay to let initial render finish
                switchTab('home', false);
                setTimeout(() => {
                    try { openDetails(item.id); } catch (err) { /* silent */ }
                }, 250);

                // Remove share query parameters after a short delay so the URL becomes normal (user asked for 2s)
                setTimeout(() => {
                    try {
                        const cur = new URL(window.location.href);
                        cur.searchParams.delete('share');
                        cur.searchParams.delete('s');
                        cur.searchParams.delete('e');
                        const newPath = cur.pathname + (cur.search && cur.search !== '?' ? cur.search : '');
                        history.replaceState(null, '', newPath);
                    } catch (e) { /* silent */ }
                }, 2000);
            } catch (e) { /* fail silently */ }
        }

        // --- Orientation toggle persistence (global) ---
        // Saved key: 'lumina_disable_orientation_both_v1' (boolean string '1' = disabled for both horizontal & vertical prompts)
        function getOrientationDisabled() {
            try {
                return localStorage.getItem('lumina_disable_orientation_both_v1') === '1';
            } catch (e) {
                return false;
            }
        }
        function setOrientationDisabled(val) {
            try {
                if (val) localStorage.setItem('lumina_disable_orientation_both_v1', '1');
                else localStorage.removeItem('lumina_disable_orientation_both_v1');
            } catch (e) {}
        }

        // Helper to detect mobile OS (Android or iOS). Returns true only for phones/tablets.
        function isMobileOS() {
            try {
                const ua = navigator.userAgent || navigator.vendor || '';
                // Android or iOS (iPhone/iPad/iPod). Exclude Windows Phone.
                return (/android/i.test(ua) && !/windows phone/i.test(ua)) || /iPad|iPhone|iPod/.test(ua);
            } catch (e) {
                return false;
            }
        }

        // Detect whether the app is running as an installed PWA (standalone).
        function isInPWA() {
            try {
                // display-mode media query OR navigator.standalone (iOS) OR match for standalone in URL (fallback)
                if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
                if (window.navigator && window.navigator.standalone === true) return true;
                // Some launchers add `utm_source=web_app` or similar; this is a last-resort check
                try { if (new URL(window.location.href).searchParams.get('source') === 'pwa') return true; } catch(_) {}
                return false;
            } catch (e) {
                return false;
            }
        }

        // --- DETAILS MODAL ---
        function openDetails(id) {
            const item = db.find(i => i.id === id);
            if (!item) return;
            // Pause home session rotation while details modal is open to avoid background DOM work
            try { stopHomeRotator(); } catch (e) {}

            // Ensure main viewport and content are at top when opening details
            try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(_) {}
            try { const mc = document.getElementById('main-content'); if (mc) mc.scrollTo({ top: 0, behavior: 'smooth' }); else document.documentElement.scrollTop = 0; } catch(_) {}

            const modal = document.getElementById('details-modal');
            const content = document.getElementById('details-content');
            const isFav = state.favorites.includes(id);

            let playBtnLogic = '';
            let playBtnText = 'Assistir';
            let progressPct = 0;
            
            // prepare play parameters as real variables (avoid executing string-built code)
            let urlToPlay = '';
            let titleToPlay = '';
            let ctxObj = null;

            if (item.type === 'filme') {
                // some films use id_ep while others use id — use id_ep if present, otherwise fallback to item.id
                const filmKey = item.id_ep || item.id;
                const prog = state.progress[filmKey];
                // Treat completed markers as resumable: if a film was previously marked completed we show "Continuar" and preserve progress
                if (prog && (prog.completed === true || (prog.time > 5 && prog.time < prog.duration - 5))) {
                    playBtnText = 'Continuar';
                    // prefer showing 100% when explicitly completed; otherwise compute percentage safely
                    if (prog.completed && prog.duration) progressPct = 100;
                    else if (prog && prog.duration) progressPct = (prog.time / prog.duration) * 100;
                    else progressPct = (prog && prog.time) ? Math.min(100, (prog.time / (prog.duration || prog.time || 1)) * 100) : 0;
                }
                // For films adapt: if link is not direct video then pass it as embed
                urlToPlay = item.url;
                titleToPlay = item.title;
                // ensure the context uses the same key that saveProgressData and player use
                // ensure we always have a stable id for progress storage: prefer filmKey, otherwise derive from URL
                ctxObj = { type: 'filme', id: filmKey || ('url:' + encodeURIComponent(item.url || '')), trigger: 0, url: item.url };
            } else {
                const hist = state.history[item.id];
                let sToPlay = hist ? hist.s : '1';
                let eToPlay = hist ? hist.e : 0;
                // ensure season and episode exist safely
                const seasonArr = item.seasons && item.seasons[sToPlay] ? item.seasons[sToPlay] : [];
                const ep = seasonArr[eToPlay] || seasonArr[0] || { id: '', title: '', url: '' };

                const prog = state.progress[ep.id];
                if(prog && prog.time > 5 && prog.time < prog.duration - 5) progressPct = (prog.time / prog.duration) * 100;
                if(hist) playBtnText = `Continuar T${sToPlay}:E${eToPlay+1}`;

                const nextE = (seasonArr && eToPlay + 1 < seasonArr.length) ? seasonArr[eToPlay+1] : null;
                const nextContext = nextE && nextE.url ? { url: nextE.url, title: `T${sToPlay}:E${eToPlay+2} - ${nextE.title}`, s: sToPlay, e: eToPlay+1 } : null;
                urlToPlay = ep.url;
                titleToPlay = `T${sToPlay}:E${eToPlay+1} - ${ep.title}`;
                // if episode lacks an explicit id (some entries are empty), fall back to a URL-derived key so progress is tracked
                // prefer explicit id; if missing create stable generated id so embedded/mp4 episodes use consistent keys
                const stableEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : (ep && ep.url ? `${item.id}-s${sToPlay}-e${eToPlay}` : null);
                ctxObj = { 
                    type: 'serie',
                    seriesId: item.id,
                    seriesTitle: item.title,
                    season: sToPlay,
                    episode: eToPlay,
                    id: stableEpId,
                    trigger: item.nextEpisodeTrigger || 0,
                    nextEp: nextContext,
                    url: ep.url,
                    // pass intro metadata (if present) so the player can show skip button for the full intro window
                    introStart: (ep && typeof ep.introStart !== 'undefined') ? Number(ep.introStart) : 0,
                    introDuration: (ep && typeof ep.introDuration !== 'undefined') ? Number(ep.introDuration) : 0
                };
            }

            // Build metadata mapping for details pages (keeps db untouched; adds production/distribution/studio/rights where provided)
            const metaMap = {
                'espiritos-na-escola': { production: 'AwesomenessTV', distribution: 'Paramount+', studio: 'CBS Studios', original: 'School Spirits (2023)' },
                'diario-banana-1': { creator: 'Jeff Kinney', franchiseRights: 'Wimpy Kid, Inc.', linkedTo: 'The Walt Disney Company' },
                'diario-banana-2': { creator: 'Jeff Kinney', franchiseRights: 'Wimpy Kid, Inc.', linkedTo: 'The Walt Disney Company' },
                'diario-banana-3': { creator: 'Jeff Kinney', franchiseRights: 'Wimpy Kid, Inc.', linkedTo: 'The Walt Disney Company' },
                'stranger-things': { productionAndRights: 'Netflix' },
                'divertida-mente-1': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'divertida-mente-2': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'luca': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'soul': { production: 'Pixar Animation Studios', property: 'The Walt Disney Company' },
                'super-mario-2023': { production: 'Illumination', brandRights: 'Nintendo', distribution: 'Universal Pictures' },
                'heartstopper': { source: 'Obra de Alice Oseman', productionAndDistribution: 'Netflix' },
                'jujutsu-execucao': { mangaPublisher: 'Shueisha', animeStudio: 'MAPPA' },
                'fnaf-nightmare': { franchiseCreator: 'Scott Cawthon', production: 'Blumhouse Productions', distribution: 'Universal Pictures' },
                'fnaf-2': { franchiseCreator: 'Scott Cawthon', production: 'Blumhouse Productions', distribution: 'Universal Pictures' },
                'spider-verse-pt': { production: 'Sony Pictures', characterOwner: 'Marvel Entertainment' },
                'spiderman-far-from-home-pt': { production: 'Sony Pictures', characterOwner: 'Marvel Entertainment' },
                'topgun-maverick': { productionAndDistribution: 'Paramount Pictures' },
                'outer-banks': { productionAndRights: 'Netflix' },
                'south-park-panderverso': { production: 'MTV Entertainment Studios', distribution: 'Paramount+' }
            };

            const meta = metaMap[item.id] || {};
            const buildMetaHtml = () => {
                const lines = [];
                if (meta.original) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Original:</strong> ${meta.original}</div>`);
                if (meta.production) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção:</strong> ${meta.production}</div>`);
                if (meta.productionAndRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Direitos:</strong> ${meta.productionAndRights}</div>`);
                if (meta.distribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Distribuição:</strong> ${meta.distribution}</div>`);
                if (meta.studio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Estúdio responsável:</strong> ${meta.studio}</div>`);
                if (meta.brandRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da marca:</strong> ${meta.brandRights}</div>`);
                if (meta.franchiseRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da franquia:</strong> ${meta.franchiseRights}</div>`);
                if (meta.creator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Obra criada por:</strong> ${meta.creator}</div>`);
                if (meta.linkedTo) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Ligado a:</strong> ${meta.linkedTo}</div>`);
                if (meta.productionAndDistribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Distribuição:</strong> ${meta.productionAndDistribution}</div>`);
                if (meta.source) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Fonte:</strong> ${meta.source}</div>`);
                if (meta.mangaPublisher) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Mangá publicado por:</strong> ${meta.mangaPublisher}</div>`);
                if (meta.animeStudio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Anime produzido por:</strong> ${meta.animeStudio}</div>`);
                if (meta.franchiseCreator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Franquia criada por:</strong> ${meta.franchiseCreator}</div>`);
                if (meta.property) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Propriedade:</strong> ${meta.property}</div>`);
                if (meta.characterOwner) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Personagem pertence a:</strong> ${meta.characterOwner}</div>`);
                return lines.join('');
            };

            // Build meta HTML: include known metaMap entries AND any credits/production fields present on the item itself
            const metaHtml = (() => {
                const lines = [];
                // include mapped meta first (keeps curated info)
                if (meta.original) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Original:</strong> ${meta.original}</div>`);
                if (meta.production) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção:</strong> ${meta.production}</div>`);
                if (meta.productionAndRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Direitos:</strong> ${meta.productionAndRights}</div>`);
                if (meta.distribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Distribuição:</strong> ${meta.distribution}</div>`);
                if (meta.studio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Estúdio responsável:</strong> ${meta.studio}</div>`);
                if (meta.brandRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da marca:</strong> ${meta.brandRights}</div>`);
                if (meta.franchiseRights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos da franquia:</strong> ${meta.franchiseRights}</div>`);
                if (meta.creator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Obra criada por:</strong> ${meta.creator}</div>`);
                if (meta.linkedTo) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Ligado a:</strong> ${meta.linkedTo}</div>`);
                if (meta.productionAndDistribution) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção/Distribuição:</strong> ${meta.productionAndDistribution}</div>`);
                if (meta.source) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Fonte:</strong> ${meta.source}</div>`);
                if (meta.mangaPublisher) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Mangá publicado por:</strong> ${meta.mangaPublisher}</div>`);
                if (meta.animeStudio) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Anime produzido por:</strong> ${meta.animeStudio}</div>`);
                if (meta.franchiseCreator) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Franquia criada por:</strong> ${meta.franchiseCreator}</div>`);
                if (meta.property) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Propriedade:</strong> ${meta.property}</div>`);
                if (meta.characterOwner) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Personagem pertence a:</strong> ${meta.characterOwner}</div>`);

                // Now include any explicit fields present on the item (credits/producer/distributor/cast/director)
                if (item.production) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produção:</strong> ${item.production}</div>`);
                if (item.producer) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Produtor(es):</strong> ${Array.isArray(item.producer) ? item.producer.join(', ') : item.producer}</div>`);
                if (item.distributor) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Distribuidora:</strong> ${item.distributor}</div>`);
                if (item.productionNote) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Nota de produção:</strong> ${item.productionNote}</div>`);
                if (item.director) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direção:</strong> ${Array.isArray(item.director) ? item.director.join(', ') : item.director}</div>`);
                if (item.writer) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Roteiro:</strong> ${Array.isArray(item.writer) ? item.writer.join(', ') : item.writer}</div>`);
                if (item.cast && Array.isArray(item.cast) && item.cast.length) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Elenco:</strong> ${item.cast.join(', ')}</div>`);
                if (item.rights) lines.push(`<div class="text-xs text-white/50 mb-1"><strong>Direitos:</strong> ${item.rights}</div>`);

                return lines.join('');
            })();

            content.innerHTML = `
                <button id="close-details-btn" class="fixed top-6 right-6 z-[100] w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                    <i class="ph ph-x text-lg"></i>
                </button>

                <div class="relative w-full h-[60vh] bg-surface">
                    <img src="${item.cover}" class="absolute inset-0 w-full h-full object-cover opacity-50 hero-cover-no-scale" onload="this.classList.add('loaded')">
                    <div class="absolute inset-0 fade-bottom"></div>
                </div>

                <!-- Info block: on desktop keep it in-flow (relative) to avoid overlay clipping/position bugs; mobile still stacks -->
                <div class="md:relative md:bottom-auto md:left-auto md:w-full md:p-16 p-6 relative z-10">
                    <div class="max-w-3xl md:mx-16 animate-slide-up bg-transparent">
                        <h1 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">${item.title}</h1>
                        
                        <div class="flex items-center gap-3 text-sm font-medium text-white/60 mb-6">
                            ${getAgeBadge(item.ageRating)}
                            <span>${item.year}</span>
                            <span>•</span>
                            <span>${item.category}</span>
                        </div>

                        <p class="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-light">${item.description}</p>

                        ${metaHtml ? `<div class="mb-6 p-3 rounded-lg bg-black/30 border border-white/5">${metaHtml}</div>` : ''}

                        <div class="flex items-center gap-4">
                            ${item.type === 'filme' || (item.type === 'serie' && item.seasons && item.seasons['1'] && item.seasons['1'][0] && item.seasons['1'][0].url) ? `
                                <button id="play-btn-${item.id}" class="bg-white text-black px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2 relative overflow-hidden group">
                                    <i class="ph-fill ph-play text-lg"></i> ${playBtnText}
                                    ${progressPct > 0 ? `
                                        <div class="absolute bottom-0 left-0 h-1 bg-black/20 w-full">
                                            <div class="h-full bg-accent" style="width: ${progressPct}%"></div>
                                        </div>
                                    ` : ''}
                                </button>
                            ` : ''}
                            <button id="fav-btn-${item.id}" onclick="toggleFav(event, '${item.id}')" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                                <i class="${isFav ? 'ph-fill ph-check text-accent' : 'ph ph-plus'} text-xl"></i>
                            </button>
                            <button id="share-btn-${item.id}" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors" title="Compartilhar">
                                <i class="ph ph-share-network text-xl"></i>
                            </button>
                            <!-- Mobile-only: toggle global orientation prompt on/off (saves to localStorage; applies to all items) -->
                            <button id="orient-toggle-${item.id}" onclick="event.stopPropagation();" class="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors md:hidden" title="Alternar ajuste de orientação">
                                <i class="ph ph-device-mobile text-white text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="px-6 md:px-16 pt-8 max-w-5xl mx-auto">
                    ${item.type === 'serie' ? generateSeasonsHTML(item) : '<div class="h-20"></div>'}
                </div>
            `;

            // ensure details content scrolls to top when opened
            try { const detailsEl = document.getElementById('details-content'); if (detailsEl) detailsEl.scrollTo({ top: 0, behavior: 'auto' }); } catch(e) { if (detailsEl) detailsEl.scrollTop = 0; }
            // attach close handler safely using doom
            const closeBtn = doom(`#close-details-btn`);
            if (closeBtn) closeBtn.onclick = closeDetails;

            // attach play handler lazily (only exposing the url when user clicks)
            const playBtn = doom(`#play-btn-${item.id}`);
            if (playBtn) {
                playBtn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    try {
                        // call requestPlay using the prepared variables (closure) to avoid string-eval issues
                        if (typeof urlToPlay === 'string' && urlToPlay.trim() !== '') {
                            requestPlay(urlToPlay, titleToPlay || item.title, ctxObj);
                        }
                    } catch (e) { /* safe guard */ }
                });
            }

            // attach share handler programmatically to avoid inline JS referencing local "item" in global scope
            try {
                const shareBtn = doom(`#share-btn-${item.id}`);
                if (shareBtn) {
                    shareBtn.onclick = (ev) => {
                        ev.stopPropagation();
                        // use real runtime values (avoid string-template placeholders)
                        const histLocal = state.history[item.id];
                        if (item.type === 'serie' && histLocal) {
                            shareItemById(item.id, { season: histLocal.s, episode: histLocal.e });
                        } else {
                            shareItemById(item.id);
                        }
                    };
                }
            } catch(e) { /* silent */ }

            // Orientation toggle (mobile-only) - global setting persisted and applied to all items
            try {
                const orientBtn = doom(`#orient-toggle-${item.id}`);
                if (orientBtn) {
                    const renderState = () => {
                        const disabled = getOrientationDisabled();
                        orientBtn.innerHTML = disabled
                            ? `<i class="ph-fill ph-device-mobile text-accent text-lg"></i>`
                            : `<i class="ph ph-device-mobile text-white text-lg"></i>`;
                        // Clarify that the toggle disables BOTH orientation prompts (landscape and portrait)
                        orientBtn.title = disabled ? 'Ajustes de orientação desativados (paisagem + retrato)' : 'Ajustes de orientação ativados (paisagem + retrato)';
                    };
                    renderState();
                    orientBtn.onclick = (ev) => {
                        ev.stopPropagation();
                        const now = !getOrientationDisabled();
                        setOrientationDisabled(now);
                        renderState();
                        // small visual feedback
                        orientBtn.classList.remove('pop-anim');
                        void orientBtn.offsetWidth;
                        orientBtn.classList.add('pop-anim');
                        // re-render views so other UI updates reflect change
                        renderView();
                    };
                }
            } catch(e) { /* silent */ }

            document.body.style.overflow = 'hidden';
            modal.classList.remove('hidden');
            requestAnimationFrame(() => modal.classList.remove('opacity-0'));
        }

        function generateSeasonsHTML(item) {
            // Render minimal season UI, do NOT preload episodes. Episodes are loaded on demand when user selects a season.
            const seasonsList = Object.keys(item.seasons);
            const hist = state.history[item.id];
            const activeSeason = hist ? hist.s.toString() : seasonsList[0];

            // Each option triggers loadSeason which will populate episodes only when requested.
            let html = `
                <div class="animate-fade-in" style="animation-delay: 0.2s">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="font-display text-xl font-medium text-white">Episódios</h3>
                        <div class="relative">
                            <select id="season-select-${item.id}" class="bg-elevated text-white text-sm font-medium rounded-lg px-4 py-2 pr-10 outline-none appearance-none cursor-pointer border border-white/5 hover:border-white/10 transition-colors">
                                ${seasonsList.map(s => `<option value="${s}" ${s === activeSeason ? 'selected' : ''}>Temporada ${s}</option>`).join('')}
                            </select>
                            <i class="ph ph-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"></i>
                        </div>
                    </div>
                    <div id="episodes-container-${item.id}" class="flex flex-col gap-3 pb-12"></div>
                </div>
            `;

            // Attach a tiny deferred listener to load the active season only when the modal is visible and stable
            setTimeout(() => {
                const select = doom(`#season-select-${item.id}`);
                if (!select) return;
                // load the currently active season once
                loadSeason(item.id, activeSeason);
                select.onchange = (e) => loadSeason(item.id, e.target.value);
            }, 80);

            return html;
        }

        // Load episodes for a specific season on-demand; this reduces DB and memory pressure.
        function loadSeason(itemId, seasonNum) {
            const item = db.find(i => i.id === itemId);
            if (!item) return;
            const episodes = item.seasons[seasonNum] || [];
            const container = doom(`#episodes-container-${itemId}`);
            if(!container) return;

            // Build episode list lazily (images set with loading=lazy)
            container.innerHTML = episodes.map((ep, index) => {
                const isAvailable = ep.url && ep.url.trim() !== '';
                // use a stable episode id fallback when ep.id is missing so progress and history persist correctly
                const stableEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : (ep && ep.url ? `${item.id}-s${seasonNum}-e${index}` : `${item.id}-s${seasonNum}-e${index}`);
                const prog = state.progress[stableEpId];
                const pct = (prog && prog.duration) ? Math.min(100, (prog.time / prog.duration) * 100) : (prog && prog.time ? Math.min(100, (prog.time / (prog.time + 60)) * 100) : 0);
                
                const nextE = index + 1 < episodes.length ? episodes[index+1] : null;
                const nextContext = nextE && nextE.url ? { url: nextE.url, title: `T${seasonNum}:E${index+2} - ${nextE.title}`, s: seasonNum, e: index+1 } : null;
                const ctx = { type: 'serie', seriesId: item.id, seriesTitle: item.title, season: seasonNum, episode: index, id: stableEpId, trigger: item.nextEpisodeTrigger || 0, nextEp: nextContext, url: ep.url, introStart: ep.introStart || 0, introDuration: ep.introDuration || 0 };
                const ctxStr = JSON.stringify(ctx).replace(/"/g, '&quot;');
                const titleStr = `T${seasonNum}:E${index+1} - ${String(ep.title || '').replace(/'/g, "\\'")}`;

                return `
                    <div onclick="${isAvailable ? `requestPlay('${ep.url}', '${titleStr}', ${ctxStr})` : ''}" 
                         class="group flex gap-4 p-3 rounded-2xl transition-colors duration-300 ${isAvailable ? 'cursor-pointer hover:bg-elevated' : 'opacity-50'}">
                        
                        <div class="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden bg-surface shrink-0 border border-white/5">
                            <img loading="lazy" decoding="async" src="${item.cover}" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                            <div class="absolute inset-0 flex items-center justify-center">
                                ${isAvailable ? `
                                    <div class="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 shadow-md">
                                        <i class="ph-fill ph-play text-white"></i>
                                    </div>
                                ` : ''}
                            </div>
                            ${pct > 0 ? `
                                <div class="absolute bottom-0 left-0 w-full h-1 bg-black/40">
                                    <div class="h-full bg-accent" style="width: ${pct}%"></div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex flex-col justify-center py-1 flex-1 min-w-0">
                            <div class="flex justify-between items-start mb-1">
                                <h4 class="text-white font-medium text-sm md:text-base truncate pr-4">${index+1}. ${ep.title}</h4>
                                ${pct > 90 ? '<i class="ph-fill ph-check-circle text-white/30 text-lg"></i>' : ''}
                            </div>
                            <span class="text-xs text-white/40">Episódio ${index+1}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function changeSeason(itemId, seasonNum) {
            const item = db.find(i => i.id === itemId);
            const episodes = item.seasons[seasonNum];
            const container = document.getElementById('episodes-container');
            if(!container) return;

            container.innerHTML = episodes.map((ep, index) => {
                const isAvailable = ep.url && ep.url.trim() !== '';
                // stable id fallback so progress mapping works even when ep.id missing
                const stableEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : (ep && ep.url ? `${item.id}-s${seasonNum}-e${index}` : `${item.id}-s${seasonNum}-e${index}`);
                const prog = state.progress[stableEpId];
                const pct = (prog && prog.duration) ? Math.min(100, (prog.time / prog.duration) * 100) : (prog && prog.time ? Math.min(100, (prog.time / (prog.time + 60)) * 100) : 0);
                
                const nextE = index + 1 < episodes.length ? episodes[index+1] : null;
                const nextContext = nextE && nextE.url ? { url: nextE.url, title: `T${seasonNum}:E${index+2} - ${nextE.title}`, s: seasonNum, e: index+1 } : null;
                const ctx = { type: 'serie', seriesId: item.id, seriesTitle: item.title, season: seasonNum, episode: index, id: stableEpId, trigger: item.nextEpisodeTrigger || 0, nextEp: nextContext, url: ep.url, introStart: ep.introStart || 0, introDuration: ep.introDuration || 0 };
                const ctxStr = JSON.stringify(ctx).replace(/"/g, '&quot;');
                const titleStr = `T${seasonNum}:E${index+1} - ${String(ep.title || '').replace(/'/g, "\\'")}`;

                return `
                    <div onclick="${isAvailable ? `requestPlay('${ep.url}', '${titleStr}', ${ctxStr})` : ''}" 
                         class="group flex gap-4 p-3 rounded-2xl transition-colors duration-300 ${isAvailable ? 'cursor-pointer hover:bg-elevated' : 'opacity-50'}">
                        
                        <div class="relative w-32 md:w-40 aspect-video rounded-xl overflow-hidden bg-surface shrink-0 border border-white/5">
                            <img src="${item.cover}" class="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                            <div class="absolute inset-0 flex items-center justify-center">
                                ${isAvailable ? `
                                    <div class="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 shadow-md">
                                        <i class="ph-fill ph-play text-white"></i>
                                    </div>
                                ` : ''}
                            </div>
                            ${pct > 0 ? `
                                <div class="absolute bottom-0 left-0 w-full h-1 bg-black/40">
                                    <div class="h-full bg-accent" style="width: ${pct}%"></div>
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="flex flex-col justify-center py-1 flex-1 min-w-0">
                            <div class="flex justify-between items-start mb-1">
                                <h4 class="text-white font-medium text-sm md:text-base truncate pr-4">${index+1}. ${ep.title}</h4>
                                ${pct > 90 ? '<i class="ph-fill ph-check-circle text-white/30 text-lg"></i>' : ''}
                            </div>
                            <span class="text-xs text-white/40">Episódio ${index+1}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function closeDetails() {
            const modal = document.getElementById('details-modal');
            if (!modal) return;
            // start hide transition
            modal.classList.add('opacity-0');

            // capture reference to content element outside try blocks so it's always defined in cleanup scope
            const content = document.getElementById('details-content');

            setTimeout(() => {
                try {
                    // hide modal
                    modal.classList.add('hidden');

                    // Unload details content and any attached listeners to free memory
                    if (content) {
                        try {
                            // Remove season select listeners if any
                            doomAll('select[id^="season-select-"]', content).forEach(s => { try { s.onchange = null; } catch(_) {} });
                        } catch(_) {}
                        try { content.innerHTML = ''; } catch(_) { content.textContent = ''; }
                    }

                    // Remove any pending references
                    state.pendingVideo = null;

                    // Attempt to flush progress/history safely
                    try {
                        if (window.player && typeof window.player.saveProgress === 'function') {
                            try { window.player.saveProgress(); } catch(_) {}
                        }
                        try { flushProgressNow(); } catch(_) {}
                    } catch (_) {}

                    // Resume home/session rotator after details modal closes to restart gentle background updates
                    try { startHomeRotator(); } catch (e) {}

                    // Re-render main view to refresh UI
                    try { renderView(); } catch(_) {}

                    // restore body scroll (only if no other modal is open)
                    try {
                        const playerModal = document.getElementById('player-modal');
                        if (playerModal && !playerModal.classList.contains('hidden')) {
                            // keep body overflow hidden if player still open
                        } else {
                            document.body.style.overflow = '';
                        }
                    } catch(_) { document.body.style.overflow = ''; }
                } catch (err) {
                    // best-effort fallback cleanup if anything throws
                    try { if (content) { content.innerHTML = ''; } } catch(_) {}
                    try { state.pendingVideo = null; } catch(_) {}
                    try { document.body.style.overflow = ''; } catch(_) {}
                    try { startHomeRotator(); } catch(_) {}
                }
            }, 500);
        }

        // --- PLAYER LOGIC (supports direct video files and embed URLs) ---
        function requestPlay(url, title, context) {
            // If the site has been sanitized (media/urls removed) do not allow playing until a full reload
            try {
                if (window.__lumina_sanitized) {
                    try { showToast('Mídia removida por segurança. Recarregue a página para restaurar.'); } catch(_) {}
                    return;
                }
            } catch (_) {}

            const isPortrait = window.innerHeight > window.innerWidth;

            // On mobile and for direct video files, perform a small range "warmup" fetch to prime the CDN/host
            // which often reduces initial buffering and startup latency on flaky mobile networks.
            const shouldWarmup = (function() {
                try {
                    // warmup only for mobile OS, not desktop-sized windows
                    if (!isMobileOS()) return false;
                    // only for direct video files (mp4/webm/etc.)
                    if (!isDirectVideo(url)) return false;
                    // avoid warming up for extremely short clips or opaque embed providers
                    return true;
                } catch (e) { return false; }
            })();

            if (shouldWarmup) {
                // do not block orientation prompt flow: queue the pending video but warm the connection in background
                state.pendingVideo = { url, title, context };

                // attempt a lightweight range request for the first 64KB to warm connections
                (async () => {
                    try {
                        // normalize URL and request small byte range; some CDNs ignore Range for cross-origin HEADs,
                        // so keep this best-effort and fail silently if blocked.
                        const controller = new AbortController();
                        const timeout = setTimeout(() => controller.abort(), 9000);
                        const res = await fetch(url, {
                            method: 'GET',
                            headers: { 'Range': 'bytes=0-65535' },
                            mode: 'cors',
                            credentials: 'omit',
                            signal: controller.signal,
                            cache: 'no-store'
                        }).catch(() => null);
                        clearTimeout(timeout);

                        // if we got a response (206 or 200) we can proceed to open the player; otherwise still attempt open
                        // Slight delay to let TCP/TLS handshake stay warm on some networks
                        await new Promise(r => setTimeout(r, 160));
                    } catch (e) {
                        // ignore errors; warmup is purely opportunistic
                    } finally {
                        // proceed with orientation prompt / playback flow after warmup attempt
                        try {
                            // If portrait orientation & orientation prompts are enabled, show prompt; otherwise open player
                            if (isMobileOS() && isPortrait && !getOrientationDisabled() && !isInPWA()) {
                                const modal = document.getElementById('orientation-modal');
                                modal.classList.remove('hidden');
                                modal.classList.add('flex');
                                setTimeout(() => modal.classList.remove('opacity-0'), 10);
                                window.addEventListener('resize', handleOrientation);
                            } else {
                                openPlayer(url, title, context);
                            }
                        } catch (_) {
                            // fallback: open player regardless
                            try { openPlayer(url, title, context); } catch(_) {}
                        }
                    }
                })();

            } else {
                // same behavior as before: show orientation prompt on mobile or open player directly
                if (isMobileOS() && isPortrait && !getOrientationDisabled() && !isInPWA()) {
                    state.pendingVideo = { url, title, context };
                    const modal = document.getElementById('orientation-modal');
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    setTimeout(() => modal.classList.remove('opacity-0'), 10);
                    window.addEventListener('resize', handleOrientation);
                } else {
                    openPlayer(url, title, context);
                }
            }
        }

        function handleOrientation() {
            const isPortrait = window.innerHeight > window.innerWidth;
            if (!isPortrait && state.pendingVideo) {
                cancelPlay(false); 
                openPlayer(state.pendingVideo.url, state.pendingVideo.title, state.pendingVideo.context);
                state.pendingVideo = null;
            }
        }

        function cancelPlay(clear = true) {
            if(clear) state.pendingVideo = null;
            const modal = document.getElementById('orientation-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 300);
            window.removeEventListener('resize', handleOrientation);
        }

        const player = {
            vid: null, iframe: null, uiTimeout: null, saveInterval: null, context: null, nextPromptShown: false, isSeeking: false, isEmbed: false, preferredRate: 1,
            
            _cleanupBeforeInit: function() {
                // fully tear down any previous player instance/state to avoid mixing metadata between plays
                try {
                    if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                    if (this.saveInterval) { clearInterval(this.saveInterval); this.saveInterval = null; }
                    if (this.ytSaveInterval) { clearInterval(this.ytSaveInterval); this.ytSaveInterval = null; }

                    if (this.ytPlayer && typeof this.ytPlayer.destroy === 'function') {
                        try { this.ytPlayer.destroy(); } catch(_) {}
                        this.ytPlayer = null;
                    }

                    if (this.vid) {
                        try {
                            this.vid.pause();
                            this.vid.removeAttribute && this.vid.removeAttribute('src');
                            this.vid.load && this.vid.load();
                        } catch (_) {}
                        try { this.vid.src = ''; } catch(_) {}
                        this.vid = null;
                    }

                    if (this.iframe) {
                        try { this.iframe.src = 'about:blank'; } catch(_) {}
                        this.iframe = null;
                    }

                    // clear any leftover DOM controls bound handlers that might reference old player
                    try {
                        const progBar = document.getElementById('progress-bar');
                        const fill = document.getElementById('progress-fill');
                        if (progBar) { progBar.oninput = null; progBar.onchange = null; progBar.value = 0; }
                        if (fill) fill.style.width = '0%';
                        const tc = document.getElementById('time-current');
                        const td = document.getElementById('time-duration');
                        if (tc) tc.innerText = '00:00';
                        if (td) td.innerText = '00:00';
                    } catch(_) {}

                    // reset state flags
                    this.context = null;
                    this.nextPromptShown = false;
                    this.isSeeking = false;
                    this.isEmbed = false;
                    this.isYouTube = false;
                    this.preferredRate = this.preferredRate || 1;

                    // ensure skip-intro UI hidden between plays (guarded)
                    try {
                        const skipBtn = document.getElementById('skip-intro-btn');
                        if (skipBtn) skipBtn.style.display = 'none';
                    } catch (e) {}

                    // ensure UI shows default paused state
                    try { updatePlayBtns(true); updateVolIcon(); } catch(_) {}
                } catch (_) {}
            },

            init: function(url, title, context) {
                // defensively tear down any previous playback artifacts before initializing a new one
                try { this._cleanupBeforeInit(); } catch(_) {}
                this.context = context; this.nextPromptShown = false; this.isSeeking = false;
                // Persist initial history/progress entry when starting playback so "Continuar Assistindo" updates immediately.
                try {
                    if (this.context && this.context.type === 'serie' && this.context.seriesId) {
                        state.history[this.context.seriesId] = {
                            s: this.context.season,
                            e: this.context.episode,
                            epId: this.context.id,
                            timestamp: Date.now()
                        };
                        // write to storage (debounced inside saveProgressData)
                        saveProgressData();
                    } else if (this.context && this.context.type === 'filme' && this.context.id) {
                        // ensure a placeholder progress record exists for films (helps continue list and safe saves)
                        state.progress[this.context.id] = state.progress[this.context.id] || { time: 0, duration: 0, timestamp: Date.now() };
                        saveProgressData();
                    }
                } catch (e) { /* non-blocking */ }
                const modal = document.getElementById('player-modal');
                modal.classList.remove('hidden'); modal.classList.add('flex');
                setTimeout(() => modal.classList.remove('opacity-0'), 10);
                document.body.style.overflow = 'hidden';

                // start hidden — visibility will be managed dynamically while playing (shown only during intro window)
                try {
                    const skipBtn = document.getElementById('skip-intro-btn');
                    if (skipBtn) skipBtn.style.display = 'none';
                } catch (e) {}

                const wrapper = document.getElementById('player-media-wrapper');
                wrapper.innerHTML = ''; // clear previous

                // Determine embed vs native video. For One Piece series, force native video playback
                this.isEmbed = !isDirectVideo(url);

                // Setup a load watchdog to close player if no playable media starts (YouTube/embed/native).
                // Dropbox-hosted sources can be slower; allow up to 11s for Dropbox URLs, otherwise default to 7s.
                try {
                    // clear any previous load timeout
                    if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }

                    // Determine appropriate timeout: longer for Dropbox links (16s), otherwise 7s.
                    // Special-case: episodes 2..8 (indices 1..7) of season 1 for series 'one-piece-live' get 15s.
                    let watchdogDelay = 7000;
                    try {
                        const lower = String(url || '').toLowerCase();
                        // If this playback request targets one-piece-live S1 episodes 2..8, give 15s
                        try {
                            const isOnePiece = this.context && this.context.seriesId === 'one-piece-live';
                            const seasonStr = this.context && (typeof this.context.season !== 'undefined') ? String(this.context.season) : null;
                            const episodeIdx = (typeof this.context !== 'undefined' && typeof this.context.episode !== 'undefined') ? Number(this.context.episode) : NaN;
                            if (isOnePiece && seasonStr === '1' && !isNaN(episodeIdx) && episodeIdx >= 1 && episodeIdx <= 7) {
                                watchdogDelay = 15000;
                            } else if (lower.includes('dropbox.com')) {
                                // Dropbox links can be slow: 16s
                                watchdogDelay = 16000;
                            }
                        } catch (inner) {
                            if (lower.includes('dropbox.com')) watchdogDelay = 16000;
                        }
                    } catch (e) { /* ignore and use default */ }

                    this.loadTimeout = setTimeout(() => {
                        try {
                            // Determine if playback has started for different types
                            let started = false;
                            // Native video started?
                            if (this.vid && !this.vid.paused && this.vid.currentTime > 0) started = true;
                            // YouTube started?
                            if (!started && this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getPlayerState === 'function') {
                                try { started = (this.ytPlayer.getPlayerState() === YT.PlayerState.PLAYING); } catch(_) {}
                            }
                            // iframe embed: best-effort check for same-origin ready state (rare); otherwise consider not started
                            if (!started && this.iframe) {
                                // if iframe loaded to something other than about:blank, treat as started
                                try { if (this.iframe.src && !this.iframe.src.includes('about:blank')) started = true; } catch(_) {}
                            }

                            if (!started) {
                                try { showToast('Falha ao carregar o vídeo — fechando o player.'); } catch(_) {}
                                try { this.close(); } catch(_) { player.close && player.close(); }
                            }
                        } catch (_) {}
                    }, watchdogDelay);
                } catch (_) {}

                // If it's an embed, attempt to detect YouTube and use the YT IFrame API to integrate with our custom UI.
                if(this.isEmbed) {
                    // prefer YouTube API for youtube embeds to allow custom controls and progress tracking
                    if (isYouTubeEmbed(url)) {
                        loadYouTubeAPIIfNeeded();
                        // prepare container for YT player
                        const ytDiv = document.createElement('div');
                        ytDiv.id = 'yt-player';
                        ytDiv.className = 'w-full h-full';
                        wrapper.appendChild(ytDiv);

                        // show UI (we will wire controls to YT player)
                        const ui = document.querySelector('.player-ui');
                        if(ui) ui.style.display = '';

                        document.getElementById('player-loading').classList.remove('hidden');
                        dismissNextEp(true);

                        // create a small YT wrapper object; actual player created when API ready
                        this.isYouTube = true;
                        this.ytPlayer = null;
                        this.ytSaveInterval = null;

                         // decide autoplay behavior: allow autoplay on desktop, require user interaction on mobile
 const allowAutoplay = !isMobileOS();
 const createYT = () => {
                            // extract video id from several possible formats
                            const extractId = (u) => {
                                try {
                                    // handle embed form
                                    const mEmbed = u.match(/youtube\.com\/embed\/([a-zA-Z0-9_\-]+)/);
                                    if (mEmbed && mEmbed[1]) return mEmbed[1];
                                    const mWatch = u.match(/[?&]v=([a-zA-Z0-9_\-]+)/);
                                    if (mWatch && mWatch[1]) return mWatch[1];
                                    const mShort = u.match(/youtu\.be\/([a-zA-Z0-9_\-]+)/);
                                    if (mShort && mShort[1]) return mShort[1];
                                    return null;
                                } catch(e) { return null; }
                            };
                            const vidId = extractId(url);
                            if (!vidId) {
                                // fallback: try to normalize into a proper embed URL to avoid being stuck on the thumbnail
                                const tryExtract = (u) => {
                                    try {
                                        const mEmbed = u.match(/(?:embed\/|\/v\/)([a-zA-Z0-9_\-]+)/);
                                        if (mEmbed && mEmbed[1]) return mEmbed[1];
                                        const mWatch = u.match(/[?&]v=([a-zA-Z0-9_\-]+)/);
                                        if (mWatch && mWatch[1]) return mWatch[1];
                                        const mShort = u.match(/youtu\.be\/([a-zA-Z0-9_\-]+)/);
                                        if (mShort && mShort[1]) return mShort[1];
                                        return null;
                                    } catch (e) { return null; }
                                };
                                const fallbackId = tryExtract(url);
                                const iframe = document.createElement('iframe');
                                if (fallbackId) {
                                    // build robust embed URL with autoplay/muted/playsinline and JS API enabled
                                    const embedSrc = `https://www.youtube.com/embed/${fallbackId}?autoplay=${allowAutoplay ? 1 : 0}&playsinline=1&enablejsapi=1&rel=0`;
                                    iframe.src = embedSrc;
                                } else {
                                    // last-resort: use original URL but append autoplay and playsinline (do not force mute)
                                    const sep = url.includes('?') ? '&' : '?';
                                    iframe.src = url + sep + `autoplay=${allowAutoplay ? 1 : 0}&playsinline=1`;
                                }
                                // ensure PiP/fullscreen/autoplay allowed and restrict popups/navigation
                                iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
                                iframe.setAttribute('referrerpolicy', 'no-referrer');
                                iframe.setAttribute('loading', 'lazy');
                                iframe.allowFullscreen = true;
                                iframe.className = 'w-full h-full';
                                wrapper.innerHTML = '';
                                wrapper.appendChild(iframe);
                                // hide loading once iframe is considered loaded (best-effort)
                                iframe.addEventListener('load', () => {
                                    try { document.getElementById('player-loading').classList.add('hidden'); } catch(_) {}
                                }, { once: true });
                                return;
                            }

                            // create YT Player
                            this.ytPlayer = new YT.Player('yt-player', {
                                videoId: vidId,
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    disablekb: 1,
                                    modestbranding: 1,
                                    rel: 0,
                                    fs: 0,
                                    iv_load_policy: 3,
                                    playsinline: 1,
                                    enablejsapi: 1
                                },
                                events: {
                                    onReady: (e) => {
                                        // Hide loading ui first
                                        const loadingEl = document.getElementById('player-loading');
                                        if (loadingEl) loadingEl.classList.add('hidden');

                                        // Cancel any load watchdog now that player is ready
                                        try { if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}

                                        // Ensure initial volume state is consistent and try a robust autoplay sequence:
                                        // 1) start muted autoplay attempt immediately
                                        // 2) if autoplay is blocked, retry a couple of times with short backoff
                                        // 3) unmute on the first user gesture to restore audio
                                        try {
                                            const tryPlay = async (attempt = 0) => {
                                                try {
                                                    // attempt play (do not forcibly mute here); set volume if supported
                                                    if (e && e.target) {
                                                        try { if (typeof e.target.setVolume === 'function') e.target.setVolume(100); } catch(_) {}
                                                        // try play; autoplay may succeed muted or with user gesture
                                                        try { e.target.playVideo && e.target.playVideo(); } catch(_) {}
                                                    }
                                                    // after a short delay check if playing; if not, attempt again (limited retries)
                                                    setTimeout(() => {
                                                        try {
                                                            const stateYT = (player && player.ytPlayer && typeof player.ytPlayer.getPlayerState === 'function') ? player.ytPlayer.getPlayerState() : null;
                                                            // YT playing state is 1
                                                            if (stateYT !== 1 && attempt < 3) {
                                                                tryPlay(attempt + 1);
                                                            }
                                                        } catch(_) {}
                                                    }, 650 + (attempt * 300));
                                                } catch (_) {}
                                            };
                                            tryPlay(0);

                                            // Unmute on first user interaction (pointerdown/touchstart) to restore audio
                                            const unmuteHandler = () => {
                                                try {
                                                    if (player && player.ytPlayer) {
                                                        try { player.ytPlayer.unMute && player.ytPlayer.unMute(); } catch(_) {}
                                                        try { player.ytPlayer.setVolume && player.ytPlayer.setVolume(100); } catch(_) {}
                                                    }
                                                } catch(_) {}
                                                document.removeEventListener('pointerdown', unmuteHandler);
                                                document.removeEventListener('touchstart', unmuteHandler);
                                            };
                                            document.addEventListener('pointerdown', unmuteHandler, { once: true, passive: true });
                                            document.addEventListener('touchstart', unmuteHandler, { once: true, passive: true });
                                        } catch (_) {}

                                        // apply preferred playback rate when available (defer small amount to ensure player ready)
                                        try {
                                            if (player && typeof player.preferredRate === 'number' && e.target.setPlaybackRate) {
                                                setTimeout(() => {
                                                    try { e.target.setPlaybackRate(player.preferredRate); } catch(_) {}
                                                }, 120);
                                            }
                                        } catch(_) {}

                                        updatePlayBtns(false);

                                        // restore saved progress if present (seek after ready)
                                        try {
                                            if (player && player.context && player.context.id) {
                                                const prog = state.progress[player.context.id];
                                                if (prog && prog.time && prog.duration) {
                                                    try { player.ytPlayer && player.ytPlayer.seekTo && player.ytPlayer.seekTo(prog.time, true); } catch(_) {}
                                                }
                                            }
                                        } catch(_) {}

                                        // start interval to update UI, manage skip-intro visibility and save progress
                                        this.ytSaveInterval = setInterval(() => {
                                            if (!this.ytPlayer || typeof this.ytPlayer.getCurrentTime !== 'function') return;
                                            const cur = this.ytPlayer.getCurrentTime();
                                            const dur = this.ytPlayer.getDuration() || 0;
                                            // update timeline UI
                                            if (!isNaN(dur) && dur > 0) {
                                                const pct = (cur / dur) * 100;
                                                const progBar = document.getElementById('progress-bar');
                                                const fill = document.getElementById('progress-fill');
                                                if (progBar) try { progBar.value = pct; } catch(e) {}
                                                if (fill) try { fill.style.width = pct + '%'; } catch(e) {}
                                                const tc = document.getElementById('time-current');
                                                const td = document.getElementById('time-duration');
                                                if (tc) tc.innerText = formatTime(cur);
                                                if (td) td.innerText = formatTime(dur);
                                            }
                                            // manage skip-intro visibility while playing YouTube
                                            try { if (typeof player.updateSkipIntroVisibility === 'function') player.updateSkipIntroVisibility(cur); } catch(_) {}
                                            // persist progress periodically (now every 500ms)
                                            if (this.context && this.context.id && typeof cur === 'number' && !isNaN(cur)) {
                                                state.progress[this.context.id] = { time: cur, duration: this.ytPlayer.getDuration() || 0, timestamp: Date.now() };
                                                if (this.context.type === 'serie') state.history[this.context.seriesId] = { s: this.context.season, e: this.context.episode, epId: this.context.id, timestamp: Date.now() };
                                                saveProgressData();
                                            }
                                        }, 500);

                                        // Ensure the iframe created by YT has PiP & autoplay allow attributes (some browsers require it)
                                        setTimeout(() => {
                                            try {
                                                const iframeNode = document.querySelector('#yt-player iframe');
                                                if (iframeNode) {
                                                    const allow = (iframeNode.getAttribute('allow') || '');
                                                    const needed = ['picture-in-picture', 'autoplay', 'fullscreen'];
                                                    let combined = allow;
                                                    needed.forEach(flag => { if (!new RegExp(flag, 'i').test(combined)) combined += '; ' + flag; });
                                                    iframeNode.setAttribute('allow', combined.replace(/;;+/g,';'));
                                                    iframeNode.setAttribute('allowfullscreen', '');
                                                }
                                            } catch(_) {}
                                        }, 500);
                                    },
                                    onStateChange: (e) => {
                                        // map YT states: 1 playing, 2 paused, 0 ended
                                        if (e.data === YT.PlayerState.PLAYING) {
                                            // If the player started muted for autoplay, restore volume icon state.
                                            updatePlayBtns(false);
                                            // playback confirmed — cancel load watchdog if active
                                            try { if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                                        }
                                        if (e.data === YT.PlayerState.PAUSED) updatePlayBtns(true);
                                        if (e.data === YT.PlayerState.ENDED) {
                                            updatePlayBtns(true);
                                            if (this.context && this.context.nextEp) playNextEpisode();
                                        }
                                    }
                                }
                            });
                        };

                        // if API already ready, create immediately, else poll until ready
                        if (typeof YT !== 'undefined' && YT && YT.Player) createYT();
                        else {
                            const waitForYT = setInterval(() => {
                                if (typeof YT !== 'undefined' && YT && YT.Player) {
                                    clearInterval(waitForYT);
                                    createYT();
                                }
                            }, 150);
                        }

                        // wire existing UI controls to YT player actions (center play button, bottom play, progress bar, volume)
                        const wireYTControls = () => {
                            const center = document.getElementById('center-play-btn');
                            const bottom = document.getElementById('bottom-play-btn');
                            const progBar = document.getElementById('progress-bar');
                            const volEl = document.getElementById('volume-bar');
                            if (center) center.onclick = () => {
                                if (!this.ytPlayer) return;
                                const stateYT = this.ytPlayer.getPlayerState();
                                if (stateYT === YT.PlayerState.PLAYING) {
                                    this.ytPlayer.pauseVideo();
                                } else {
                                    // unmute before playing to restore audio after user interaction
                                    try { this.ytPlayer.unMute && this.ytPlayer.unMute(); } catch(_) {}
                                    try { this.ytPlayer.setVolume && this.ytPlayer.setVolume(100); } catch(_) {}
                                    this.ytPlayer.playVideo && this.ytPlayer.playVideo();
                                }
                            };
                            if (bottom) bottom.onclick = () => {
                                if (!this.ytPlayer) return;
                                const stateYT = this.ytPlayer.getPlayerState();
                                if (stateYT === YT.PlayerState.PLAYING) {
                                    this.ytPlayer.pauseVideo();
                                } else {
                                    try { this.ytPlayer.unMute && this.ytPlayer.unMute(); } catch(_) {}
                                    try { this.ytPlayer.setVolume && this.ytPlayer.setVolume(100); } catch(_) {}
                                    this.ytPlayer.playVideo && this.ytPlayer.playVideo();
                                }
                            };
                            if (progBar) {
                                progBar.oninput = (e) => {
                                    const dur = this.ytPlayer && this.ytPlayer.getDuration ? this.ytPlayer.getDuration() : 0;
                                    if (!dur) return;
                                    const targetTime = (e.target.value / 100) * dur;
                                    if (this.ytPlayer && this.ytPlayer.seekTo) {
                                        this.ytPlayer.seekTo(targetTime, true);
                                    }
                                };
                            }
                            if (volEl) {
                                volEl.oninput = (e) => {
                                    try {
                                        const v = parseFloat(e.target.value);
                                        if (this.ytPlayer && this.ytPlayer.setVolume) {
                                            this.ytPlayer.setVolume(Math.round((v||1) * 100));
                                        }
                                    } catch(_) {}
                                    updateVolIcon();
                                };
                            }
                        };
                        // call wiring now (functions will guard if ytPlayer is not yet ready)
                        wireYTControls();
                    } else {
                        // If embed URL points to a direct video file (mp4/webm/mov etc.), treat it as a native video and use our custom player.
                        if (isDirectVideo(url)) {
                            // create native video element (reuse the native pipeline so controls/progress/history work)
                            this.vid = document.createElement('video');
                            this.vid.id = 'main-video';
                            this.vid.className = 'w-full h-full object-contain';
                            this.vid.playsInline = true;
                            this.vid.preload = 'metadata';
                            // Try to autoplay with audio; if browser blocks autoplay with sound, fall back to muted autoplay
                            this.vid.autoplay = true;
                            this.vid.muted = false;
                            this.vid.volume = 1;
                            this.vid.src = url;

                            // Attempt to play immediately; if blocked by autoplay policy, mute and retry, but tell the user.
                            (async () => {
                                try {
                                    await this.vid.play();
                                } catch (err) {
                                    try {
                                        // Autoplay with sound was blocked — keep audio enabled and prompt the user to tap to enable sound
                                        // We do not auto-mute; inform the user to interact to enable audio.
                                        showToast('Toque na tela para ativar o áudio', 2800);
                                    } catch (_) {}
                                }
                            })();

                            // Unmute on first user interaction (pointer/touch) to restore expected audio behavior.
                            const _unmuteOnce = () => {
                                try {
                                    // prefer a reasonable default volume when unmuting
                                    this.vid.muted = false;
                                    this.vid.volume = Math.max(0.5, this.vid.volume || 1);
                                } catch(_) {}
                                document.removeEventListener('pointerdown', _unmuteOnce);
                                document.removeEventListener('touchstart', _unmuteOnce);
                            };
                            document.addEventListener('pointerdown', _unmuteOnce, { once: true, passive: true });
                            document.addEventListener('touchstart', _unmuteOnce, { once: true, passive: true });
                            // apply preferred rate immediately so setSpeed updates persist when video is created later
                            try { 
                                this.vid.playbackRate = (typeof player !== 'undefined' && typeof player.preferredRate === 'number') ? player.preferredRate : 1;
                                this.vid.defaultPlaybackRate = this.vid.playbackRate;
                            } catch(_) {}
                            wrapper.appendChild(this.vid);

                            // ensure UI visible and functional
                            const ui = document.querySelector('.player-ui');
                            if(ui) ui.style.display = '';
                            document.getElementById('progress-bar').style.display = '';
                            document.getElementById('center-play-btn').style.display = '';
                            document.getElementById('bottom-play-btn').style.display = '';

                            document.getElementById('player-loading').classList.remove('hidden');
                            dismissNextEp(true);
                            this.setupEvents(); this.restoreProgress();

                            // attempt autoplay while muted (unmute later on interaction if allowed)
                            this.vid.play().catch(e => {});

                            // mark as non-embed so saveProgress runs normally
                            this.isEmbed = false;
                        } else {
                            // Non-YouTube embed: show a plain iframe and hide the custom player chrome
                            // Create an iframe for the embed, but for certain series (One Piece) attempt to resolve a final .mp4 target:
                            this.iframe = document.createElement('iframe');
                            this.iframe.src = url;
                            try {
                                const lower = String(url || '').toLowerCase();
                                const isToky = /tokyvideo\.com/i.test(lower);
                                const isPlayerflix = /playerflixapi\.com/i.test(lower);
                                if (isPlayerflix) {
                                    this.iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                                    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
                                } else if (isToky) {
                                    this.iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                                    this.iframe.setAttribute('allow', 'autoplay; fullscreen');
                                    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
                                } else {
                                    this.iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
                                    this.iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                                    this.iframe.setAttribute('referrerpolicy', 'no-referrer');
                                }
                            } catch (e) {
                                try { this.iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture'); } catch(_) {}
                                try { this.iframe.setAttribute('referrerpolicy', 'no-referrer'); } catch(_) {}
                            }
                            this.iframe.allowFullscreen = true;
                            this.iframe.className = 'w-full h-full';
                            wrapper.appendChild(this.iframe);

                            // If this is the One Piece series and the embed may redirect to a .mp4, try to resolve the final URL.
                            // If we can determine a final .mp4, replace iframe with a native <video> to enable accurate progress tracking.
                            (async () => {
                                try {
                                    const isOnePiece = (context && context.seriesId === 'one-piece-live');
                                    if (!isOnePiece) {
                                        // normal embeds: treat iframe load as success (watchdog canceled below)
                                        this.iframe.addEventListener('load', () => {
                                            try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                                        }, { once: true });
                                        return;
                                    }

                                    // Attempt to follow redirects and detect a final .mp4 URL.
                                    // Use HEAD first, then GET fallback. Not all endpoints allow CORS; fail gracefully if blocked.
                                    async function tryResolveFinal(urlToCheck) {
                                        try {
                                            // try HEAD with redirect follow to obtain final response.url
                                            const head = await fetch(urlToCheck, { method: 'HEAD', redirect: 'follow', cache: 'no-store' });
                                            if (head && head.ok) {
                                                const final = head.url || urlToCheck;
                                                if (final && final.match(/\.mp4(\?|$)/i)) return final;
                                                // Some servers don't expose final via HEAD; try GET but avoid downloading body
                                            }
                                        } catch (e) { /* ignore CORS or network errors */ }

                                        try {
                                            const get = await fetch(urlToCheck, { method: 'GET', redirect: 'follow', cache: 'no-store' });
                                            if (get && (get.ok || get.type === 'opaque')) {
                                                // If CORS allowed, get.url will reflect final redirect; if opaque, we can't read body but url may still be present.
                                                const final = get.url || urlToCheck;
                                                if (final && final.match(/\.mp4(\?|$)/i)) return final;
                                            }
                                        } catch (e) { /* ignore */ }

                                        return null;
                                    }

                                    // Poll for a short window: some embeds perform delayed redirects (AJAX or timed).
                                    const START = Date.now();
                                    const MAX_WAIT = 14000; // wait up to 14s for redirect -> mp4
                                    const INTERVAL = 1200;
                                    let resolved = null;

                                    // first immediate attempt
                                    resolved = await tryResolveFinal(url).catch(()=>null);
                                    if (resolved) {
                                        // swap to native video immediately
                                    } else {
                                        // poll periodically while iframe may be performing redirects
                                        while (!resolved && (Date.now() - START) < MAX_WAIT) {
                                            await new Promise(r => setTimeout(r, INTERVAL));
                                            resolved = await tryResolveFinal(url).catch(()=>null);
                                        }
                                    }

                                    if (resolved) {
                                        // Replace iframe with native <video> for full playback integration and accurate progress/save.
                                        try {
                                            // remove iframe safely
                                            try { this.iframe.src = 'about:blank'; } catch(_) {}
                                            try { this.iframe.remove(); } catch(_) {}

                                            // create video element and append
                                            this.vid = document.createElement('video');
                                            this.vid.id = 'main-video';
                                            this.vid.className = 'w-full h-full object-contain';
                                            this.vid.playsInline = true;
                                            this.vid.preload = 'metadata';
                                            this.vid.autoplay = true;
                                            this.vid.muted = false;
                                            this.vid.volume = 1;
                                            this.vid.src = resolved;

                                            // attach to wrapper
                                            wrapper.appendChild(this.vid);

                                            // hide loading when loaded and cancel watchdog
                                            this.vid.addEventListener('playing', () => {
                                                try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                                            }, { once: true });

                                            // wire up the same native event handlers and restore any progress metadata
                                            this.setupEvents && this.setupEvents();
                                            this.restoreProgress && this.restoreProgress();

                                            // ensure player flags reflect native playback
                                            this.isEmbed = false;
                                            this.isYouTube = false;

                                            // try to play (catch autoplay restrictions)
                                            try { const p = this.vid.play(); if (p && typeof p.catch === 'function') p.catch(()=>{}); } catch(_) {}
                                        } catch (swapErr) {
                                            // fallback: if swap fails, keep iframe and treat as embed
                                            try { this.iframe.addEventListener('load', () => { try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {} }, { once: true }); } catch(_) {}
                                        }
                                    } else {
                                        // couldn't resolve to mp4 within timeout: treat iframe as normal embed and hide loading on load
                                        try { this.iframe.addEventListener('load', () => { try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {} }, { once: true }); } catch(_) {}
                                    }
                                } catch (e) {
                                    // ensure we don't block player startup - fallback to normal iframe behavior
                                    try { this.iframe.addEventListener('load', () => { try { const pl = document.getElementById('player-loading'); if (pl) pl.classList.add('hidden'); if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {} }, { once: true }); } catch(_) {}
                                }
                            })();

                            const exitBtn = document.createElement('button');
                            exitBtn.id = 'embed-exit-btn';
                            exitBtn.className = 'absolute top-4 left-4 z-30 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors';
                            exitBtn.innerHTML = '<i class="ph ph-arrow-left text-lg"></i>';
                            exitBtn.onclick = () => { closePlayer(); };
                            wrapper.appendChild(exitBtn);

                            const ui = document.querySelector('.player-ui');
                            if(ui) ui.style.display = 'none';
                            const prompt = document.getElementById('next-ep-prompt');
                            if(prompt) prompt.classList.add('hidden');

                            document.getElementById('player-loading').classList.add('hidden');

                            try {
                                if (context && context.type === 'filme' && context.id) {
                                    state.progress[context.id] = { embed: true, timestamp: Date.now() };
                                    saveProgressData();
                                } else if (context && context.type === 'serie' && context.seriesId) {
                                    state.history[context.seriesId] = { s: context.season, e: context.episode, epId: context.id, timestamp: Date.now() };
                                    saveProgressData();
                                }
                            } catch (e) { /* ignore storage errors */ }
                        }
                    }
                } else {
                    // use native video - set autoplay + muted to satisfy browser autoplay policies
                    this.vid = document.createElement('video');
                    this.vid.id = 'main-video';
                    this.vid.className = 'w-full h-full object-contain';
                    this.vid.playsInline = true;
                    this.vid.preload = 'metadata';
                    this.vid.autoplay = true;
                    // Prefer start unmuted; if autoplay with sound is blocked, gracefully fall back to muted autoplay and notify user.
                    this.vid.muted = false;
                    this.vid.volume = 1;
                    this.vid.src = url;

                    (async () => {
                        try {
                            await this.vid.play();
                        } catch (err) {
                            try {
                                // Autoplay with sound was blocked — keep audio enabled and prompt user interaction instead of forcing mute
                                showToast('Toque na tela para ativar o áudio', 2800);
                            } catch (_) {}
                        }
                    })();

                    const _unmuteOnce = () => {
                        try {
                            this.vid.muted = false;
                            this.vid.volume = Math.max(0.5, this.vid.volume || 1);
                        } catch(_) {}
                        document.removeEventListener('pointerdown', _unmuteOnce);
                        document.removeEventListener('touchstart', _unmuteOnce);
                    };
                    document.addEventListener('pointerdown', _unmuteOnce, { once: true, passive: true });
                    document.addEventListener('touchstart', _unmuteOnce, { once: true, passive: true });
                    // ensure playback rate reflects user's chosen speed immediately
                    try {
                        this.vid.playbackRate = (typeof player !== 'undefined' && typeof player.preferredRate === 'number') ? player.preferredRate : 1;
                        this.vid.defaultPlaybackRate = this.vid.playbackRate;
                    } catch(_) {}
                    wrapper.appendChild(this.vid);

                    // ensure UI visible and functional
                    const ui = document.querySelector('.player-ui');
                    if(ui) ui.style.display = '';
                    document.getElementById('progress-bar').style.display = '';
                    document.getElementById('center-play-btn').style.display = '';
                    document.getElementById('bottom-play-btn').style.display = '';

                    document.getElementById('player-loading').classList.remove('hidden');
                    dismissNextEp(true);
                    this.setupEvents(); this.restoreProgress();

                    // attempt autoplay while muted (unmute later on interaction if allowed)
                    this.vid.play().catch(e => {});
                }

                document.getElementById('player-ep-title').innerText = title;
                const sTitle = document.getElementById('player-series-title');
                // Show series title when available; for films display "Filme" above the title
                if (context && context.seriesTitle) {
                    sTitle.innerText = context.seriesTitle;
                    sTitle.classList.remove('hidden');
                } else if (context && context.type === 'filme') {
                    sTitle.innerText = 'Filme';
                    sTitle.classList.remove('hidden');
                } else {
                    sTitle.classList.add('hidden');
                }

                // Request fullscreen automatically only for Android PWAs; do NOT force fullscreen on desktop or iOS.
                try {
                    function isAndroidDevice() {
                        try {
                            const ua = navigator.userAgent || navigator.vendor || '';
                            return /android/i.test(ua) && !/windows phone/i.test(ua);
                        } catch (e) { return false; }
                    }

                    if (document.documentElement.requestFullscreen) {
                        const inPwa = isInPWA();
                        // Only request fullscreen when running as an Android PWA.
                        if (inPwa && isAndroidDevice()) {
                            modal.requestFullscreen().catch(() => {});
                        }
                        // Do not request fullscreen on desktop or iOS PWAs.
                    }
                } catch(_) {
                    /* ignore fullscreen errors */
                }

                // pause background activity while player is active to avoid heavy periodic UI updates during long playback
                try { pauseBackgroundActivity(); } catch(_) {}
                // Only set save interval for native video (increase frequency to improve sync)
                if(!this.isEmbed) this.saveInterval = setInterval(() => this.saveProgress(), 500);
            },
            
            restoreProgress: function() {
                // Restore saved position reliably and only resume playback after a confirmed seek.
                if (!this.vid) return;
                if (!this.context || !this.context.id) return;
                if (this._restoredOnce) return;
                const prog = state.progress[this.context.id];
                if (!prog || typeof prog.time !== 'number' || prog.time <= 0) return;

                // Helper to perform a defensive seek and return a Promise that resolves when seek is reflected.
                const performSeek = (targetSeconds) => {
                    return new Promise((resolve) => {
                        try {
                            if (!this.vid) return resolve(false);
                            const dur = (!isNaN(this.vid.duration) && Number(this.vid.duration) > 0) ? Number(this.vid.duration) : 0;
                            let t = Number(targetSeconds) || 0;
                            if (dur > 0) t = Math.max(0, Math.min(t, Math.max(0, dur - 0.5)));
                            else t = Math.max(0, t);

                            // If current time is already past saved time by >1s, skip seeking.
                            const current = (typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                            if (current > t + 1) return resolve(true);

                            let settled = false;
                            const onSeeked = () => {
                                if (settled) return;
                                settled = true;
                                cleanup();
                                // verify approx equality (within 1s) and resolve
                                const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                                resolve(Math.abs(now - t) <= 1.1);
                            };
                            const onError = () => {
                                if (settled) return;
                                settled = true;
                                cleanup();
                                resolve(false);
                            };

                            let timer = null;
                            const cleanup = () => {
                                try { if (this.vid) { this.vid.removeEventListener('seeked', onSeeked); this.vid.removeEventListener('error', onError); } } catch(_) {}
                                if (timer) { clearTimeout(timer); timer = null; }
                            };

                            // Listen for seeked event and set a conservative fallback timeout.
                            try { this.vid.addEventListener('seeked', onSeeked); this.vid.addEventListener('error', onError); } catch(_) {}
                            try { this.vid.currentTime = t; } catch (err) {
                                // if immediate assignment fails, attempt delayed assignment
                                setTimeout(() => { try { if (this.vid) this.vid.currentTime = t; } catch(_) {} }, 60);
                            }
                            // Fallback: if seeked doesn't fire within a reasonable time, check currentTime and resolve
                            timer = setTimeout(() => {
                                if (settled) return;
                                settled = true;
                                cleanup();
                                const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                                resolve(Math.abs(now - t) <= 1.5);
                            }, 9000); // 9s fallback for slow resources (Dropbox etc.)
                        } catch (e) { resolve(false); }
                    });
                };

                const tryRestoreAndPlay = async () => {
                    try {
                        // Wait for metadata to be ready to allow reliable seeking
                        if (!(this.vid.readyState > 0 && !isNaN(this.vid.duration))) {
                            // wait up to a longer timeout for metadata
                            await new Promise((r) => {
                                let done = false;
                                const onMeta = () => { if (done) return; done = true; cleanupMeta(); r(); };
                                const cleanupMeta = () => {
                                    try { this.vid.removeEventListener('loadedmetadata', onMeta); } catch(_) {}
                                    if (metaTimer) clearTimeout(metaTimer);
                                };
                                try { this.vid.addEventListener('loadedmetadata', onMeta); } catch(_) {}
                                const metaTimer = setTimeout(() => { if (done) return; done = true; cleanupMeta(); r(); }, 16000);
                            });
                        }

                        // attempt the seek and wait for confirmation
                        const ok = await performSeek(prog.time);
                        // mark as restored regardless to avoid repeated seeks; still update progress flag
                        this._restoredOnce = true;
                        try {
                            const ex = state.progress[this.context.id] || {};
                            ex._restored = true;
                            state.progress[this.context.id] = ex;
                            saveProgressData();
                        } catch(_) {}

                        // Only auto-play if seek succeeded and the element isn't already far ahead
                        try {
                            const now = (this.vid && typeof this.vid.currentTime === 'number') ? this.vid.currentTime : 0;
                            const shouldPlay = ok && (prog.time - now <= 1.5);
                            if (shouldPlay) {
                                // try to play, swallowing promise rejections and showing user prompt if blocked
                                const p = this.vid.play();
                                if (p && typeof p.catch === 'function') p.catch(() => {
                                    // autoplay blocked: keep paused and show lightweight toast hint to user
                                    showToast('Toque para ativar o áudio/continuar a reprodução', 2200);
                                });
                            }
                        } catch (e) {
                            // if any play attempt fails, do nothing (user can press play)
                        }
                    } catch (e) {
                        // fallback: one last best-effort seek attempt without awaiting
                        try { this.vid.currentTime = prog.time; } catch(_) {}
                        this._restoredOnce = true;
                    }
                };

                // Kick off restore flow but don't block other startup work
                try { tryRestoreAndPlay(); } catch(_) {}
            },

            saveProgress: function() {
                // Save progress for both native video and embed players (YouTube / iframe) where possible.
                if (!this.context || !this.context.id) return;
                try {
                    let cur = 0, dur = 0, hasTime = false;

                    // YouTube via API
                    if (this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
                        try {
                            cur = Number(this.ytPlayer.getCurrentTime()) || 0;
                            dur = Number(this.ytPlayer.getDuration()) || 0;
                            hasTime = !isNaN(cur);
                        } catch (_) { hasTime = false; }
                    } else if (this.vid) {
                        // native video element
                        try {
                            cur = Number(this.vid.currentTime) || 0;
                            dur = (!isNaN(this.vid.duration) && Number(this.vid.duration) > 0) ? Number(this.vid.duration) : 0;
                            hasTime = true;
                        } catch (_) { hasTime = false; }
                    } else {
                        // embeds/iframes without API access: store lightweight embed marker with timestamp so continue list can still show it
                        hasTime = false;
                    }

                    // compute safe current time when we have duration
                    let safeCur = 0;
                    if (hasTime) {
                        safeCur = dur > 0 ? Math.max(0, Math.min(cur, Math.max(0, dur - 0.5))) : Math.max(0, cur);
                    }

                    // Prevent regressing saved progress: only update if new time is >= previously saved time minus small epsilon,
                    // or if no previous good record exists. This avoids overwriting with older values.
                    try {
                        const id = this.context.id;
                        const prev = state.progress[id] || {};

                        if (hasTime) {
                            // Always record the latest observed playback position and timestamp.
                            // This ensures intentional rewinds (e.g. seeking back to start) are persisted immediately.
                            state.progress[id] = { time: safeCur, duration: dur || (prev.duration || 0), timestamp: Date.now() };
                        } else {
                            // Embed/no-time cases: mark as embed-started so it appears in Continue Watching.
                            state.progress[id] = Object.assign({}, prev, { embed: true, timestamp: Date.now() });
                        }
                    } catch (inner) {
                        if (hasTime) state.progress[this.context.id] = { time: safeCur, duration: dur || 0, timestamp: Date.now() };
                        else state.progress[this.context.id] = { embed: true, timestamp: Date.now() };
                    }

                    if (this.context.type === 'serie') state.history[this.context.seriesId] = { s: this.context.season, e: this.context.episode, epId: this.context.id, timestamp: Date.now() };
                    saveProgressData();
                } catch (e) {
                    // non-blocking fallback
                    try {
                        state.progress[this.context.id] = state.progress[this.context.id] || { embed: true, timestamp: Date.now() };
                        saveProgressData();
                    } catch(_) {}
                }
            },

            close: function() {
                // common cleanup
                clearInterval(this.saveInterval); clearTimeout(this.uiTimeout);
                if (this.loadTimeout) { clearTimeout(this.loadTimeout); this.loadTimeout = null; }
                this.saveInterval = null;

                if(this.vid) {
                    // Save progress before tearing down native video (save then force immediate flush)
                    try { this.saveProgress(); } catch(_) {}
                    try { flushProgressNow(); } catch(_) {}
                    try { this.vid.pause(); } catch(_) {}
                    try { this.vid.removeAttribute && this.vid.removeAttribute('src'); } catch(_) {}
                    try { this.vid.load && this.vid.load(); } catch(_) {}
                    this.vid = null;
                }
                if(this.iframe) {
                    // nothing to save for embed itself here (progress for embeds handled earlier where possible)
                    try { this.iframe.remove(); } catch(_) {}
                    this.iframe = null;
                    // remove embed exit button if present
                    const eb = document.getElementById('embed-exit-btn');
                    if(eb) try { eb.remove(); } catch(_) {}
                }

                // cleanup global handlers
                window.onkeydown = null;

                const wrapper = document.getElementById('player-media-wrapper');
                if (wrapper) wrapper.innerHTML = '';

                // restore UI elements
                const ui = document.querySelector('.player-ui');
                if(ui) ui.style.display = '';
                const pb = document.getElementById('progress-bar');
                if(pb) pb.style.display = '';
                const cp = document.getElementById('center-play-btn');
                if(cp) cp.style.display = '';
                const bp = document.getElementById('bottom-play-btn');
                if(bp) bp.style.display = '';

                // resume background timers that were paused when playback began
                try { resumeBackgroundActivity(); } catch(_) {}

                // Ensure progress/state persisted and UI updates immediately when player closes
                try {
                    // Force immediate flush to localStorage so Continue cards and progress bars reflect latest values
                    try { flushProgressNow(); } catch(_) {}
                    // re-render the main view so "Continuar Assistindo" and episode progress bars update instantly
                    try { renderView(); } catch(_) {}
                } catch(_) {}

                const modal = document.getElementById('player-modal');
                if (modal) modal.classList.add('opacity-0');
                setTimeout(() => {
                    if (modal) {
                        modal.classList.add('hidden'); modal.classList.remove('flex');
                    }
                    // restore body overflow only when no other modal is open
                    if(document.getElementById('details-modal') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    try { if(document.fullscreenElement) document.exitFullscreen().catch(e=>e); } catch(_) {}
                    // Ensure rotate prompt shows if player was closed via player.close() path
                    try { showRotateAfterClose(); } catch (e) {}
                }, 500);
            },

            setupEvents: function() {
                // Only wire advanced interaction handlers for native <video> instances
                if (this.isEmbed || !this.vid) return;
                const container = document.getElementById('custom-player-container');
                const progBar = document.getElementById('progress-bar');
                const fill = document.getElementById('progress-fill');

                // defensive guards: ensure DOM nodes exist
                try { if (progBar) progBar.value = 0; } catch(e) {}
                try { if (fill) fill.style.width = '0%'; } catch(e) {}
                updatePlayBtns(true);

                // Unified show/hide controls helpers (exposed so external listeners can call)
                const ui = document.querySelector('.player-ui');
                const showControls = () => {
                    try {
                        if (!ui || !container) return;
                        container.classList.remove('player-idle');
                        ui.style.opacity = '';
                        ui.style.pointerEvents = '';
                        // reset auto-hide
                        clearTimeout(this.uiTimeout);
                        this.uiTimeout = setTimeout(() => { if (this.vid && !this.vid.paused && container) container.classList.add('player-idle'); }, 3500);
                    } catch (e) {}
                };
                const hideControls = () => {
                    try {
                        if (!ui || !container) return;
                        container.classList.add('player-idle');
                        ui.style.pointerEvents = 'none';
                        ui.style.opacity = '0';
                    } catch (e) {}
                };
                const toggleControlsVisibility = () => {
                    try {
                        if (!ui || !container) return;
                        const hidden = container.classList.contains('player-idle') || ui.style.opacity === '0';
                        if (hidden) showControls(); else hideControls();
                    } catch (e) {}
                };

                // Ensure primary play/pause buttons call unified toggle
                try {
                    const centerBtn = document.getElementById('center-play-btn');
                    if (centerBtn) centerBtn.onclick = () => togglePlay();
                    const bottomBtn = document.getElementById('bottom-play-btn');
                    if (bottomBtn) bottomBtn.onclick = () => togglePlay();
                } catch (e) {}

                // Interaction handler that shows controls on pointer/touch/mouse and is debounced lightly
                let interactionDebounce = null;
                const onUserInteraction = (ev) => {
                    try {
                        // if interaction is on UI controls, ignore as they are already interactive
                        const target = ev && ev.target;
                        if (target && (target.closest && target.closest('.player-ui, button, input, select, textarea, a'))) {
                            // still reset hide timer so UI doesn't disappear while interacting
                            showControls();
                            return;
                        }
                        // show controls immediately on any pointer/touch/mouse event
                        showControls();
                        // small debounce to avoid thrashing on continuous pointermove
                        if (interactionDebounce) clearTimeout(interactionDebounce);
                        interactionDebounce = setTimeout(() => { interactionDebounce = null; }, 120);
                    } catch (err) { /* ignore */ }
                };

                // Attach robust pointer/mouse/touch listeners to wrapper, container and document to ensure events are captured
                try {
                    const mediaWrap = document.getElementById('player-media-wrapper') || container;

                    // Prefer pointer events for unified handling when supported
                    ['pointermove','pointerdown','pointerup','mousemove','touchstart','touchmove','touchend'].forEach(evtName => {
                        try {
                            // use passive: true for move/start to avoid blocking, but pointerup needs default to allow releasePointerCapture in other handlers
                            const opts = (evtName === 'pointerup' || evtName === 'touchend') ? { passive: true } : { passive: true };
                            // attach to media wrap and container (some user agents route touches differently)
                            mediaWrap.addEventListener(evtName, onUserInteraction, opts);
                            container.addEventListener(evtName, onUserInteraction, opts);
                            // attach on document as a last-resort to catch events when overlays/iframes intercept them
                            document.addEventListener(evtName, onUserInteraction, opts);
                        } catch(_) {}
                    });

                    // special case: treat quick taps (pointerup) as toggle only when not interacting with UI
                    const onTapToggle = (ev) => {
                        try {
                            const target = ev && ev.target;
                            if (target && (target.closest && target.closest('.player-ui, button, input, select, textarea, a'))) return;
                            // ensure very short taps toggle; long presses or drags shouldn't
                            const now = Date.now();
                            // Use timeout heuristic: if it's a quick up event, toggle
                            toggleControlsVisibility();
                        } catch(_) {}
                    };
                    mediaWrap.addEventListener('pointerup', onTapToggle, { passive: true });
                    container.addEventListener('pointerup', onTapToggle, { passive: true });
                    document.addEventListener('pointerup', onTapToggle, { passive: true });
                } catch (e) {
                    // best-effort: ignore attach failures
                }

                // Keyboard handlers
                window.onkeydown = (e) => {
                    const pm = document.getElementById('player-modal');
                    if(!pm || pm.classList.contains('hidden')) return;
                    showControls();
                    if(e.code === 'Space') { e.preventDefault(); togglePlay(); }
                    if(e.code === 'ArrowRight') skipVideo(10);
                    if(e.code === 'ArrowLeft') skipVideo(-10);
                };

                // Native video event wiring
                this.vid.onplaying = () => {
                    const pl = document.getElementById('player-loading');
                    if (pl) pl.classList.add('hidden');
                    updatePlayBtns(false);
                    try { if (player && player.loadTimeout) { clearTimeout(player.loadTimeout); player.loadTimeout = null; } } catch(_) {}
                };
                this.vid.onwaiting = () => { const pl = document.getElementById('player-loading'); if(pl) pl.classList.remove('hidden'); };
                this.vid.onpause = () => {
                    updatePlayBtns(true);
                    showControls(); // keep controls visible on pause
                    try { this.saveProgress(); } catch(_) {}
                };

                this.vid.ontimeupdate = () => {
                    if (!this.vid) return;
                    if (this.vid.readyState < 1) {
                        const tc = document.getElementById('time-current');
                        if (tc) tc.innerText = formatTime(0);
                        return;
                    }

                    if (!this.isSeeking && !isNaN(this.vid.duration) && this.vid.duration > 0) {
                        const pct = (this.vid.currentTime / this.vid.duration) * 100;
                        if (progBar) try { progBar.value = pct || 0; } catch(e) {}
                        if (fill) try { fill.style.width = `${pct}%`; } catch(e) {}
                    }

                    const tc = document.getElementById('time-current');
                    if (tc) tc.innerText = formatTime(this.vid.currentTime || 0);
                    try { if (typeof player.updateSkipIntroVisibility === 'function') player.updateSkipIntroVisibility(this.vid.currentTime); } catch(_) {}
                    try { this.checkNextTrigger(); } catch (e) {}
                };

                this.vid.onloadedmetadata = () => { const td = document.getElementById('time-duration'); if(td) td.innerText = formatTime(this.vid.duration); };
                this.vid.onended = () => {
                    try {
                        // If explicit nextEp exists, use playNextEpisode. Otherwise, if at the last episode of the season,
                        // attempt to advance to the first episode of the next season (if available).
                        if (this.context && this.context.nextEp) {
                            playNextEpisode();
                            return;
                        }
                        if (this.context && this.context.type === 'serie' && this.context.seriesId) {
                            const seriesData = db.find(i => i.id === this.context.seriesId);
                            if (seriesData && typeof this.context.season !== 'undefined' && typeof this.context.episode !== 'undefined') {
                                const sNum = Number(this.context.season);
                                const eIdx = Number(this.context.episode);
                                const seasonArr = (seriesData.seasons && seriesData.seasons[sNum]) ? seriesData.seasons[sNum] : [];
                                // if this was the last episode in the season, check next season for first ep
                                if (eIdx + 1 >= seasonArr.length) {
                                    const nextSeasonNum = String(sNum + 1);
                                    const nextSeasonArr = seriesData.seasons && seriesData.seasons[nextSeasonNum] ? seriesData.seasons[nextSeasonNum] : null;
                                    if (nextSeasonArr && nextSeasonArr.length > 0) {
                                        const firstEp = nextSeasonArr[0];
                                        const stableEpId = (firstEp && firstEp.id) ? firstEp.id : `${seriesData.id}-s${nextSeasonNum}-e0`;
                                        // prepare full context and start next season's first episode
                                        const fullContext = {
                                            type: 'serie',
                                            seriesId: seriesData.id,
                                            seriesTitle: seriesData.title,
                                            season: nextSeasonNum,
                                            episode: 0,
                                            id: stableEpId,
                                            trigger: seriesData.nextEpisodeTrigger || 0,
                                            nextEp: (nextSeasonArr.length > 1) ? { url: nextSeasonArr[1].url, title: `T${nextSeasonNum}:E2 - ${nextSeasonArr[1].title}`, s: nextSeasonNum, e: 1 } : null,
                                            url: firstEp.url
                                        };
                                        // init player for next season first episode
                                        player.init(firstEp.url, `T${nextSeasonNum}:E1 - ${firstEp.title}`, fullContext);
                                        // update season UI if open
                                        try { changeSeason(seriesData.id, nextSeasonNum); } catch(_) {}
                                        return;
                                    }
                                }
                            }
                        }
                        // fallback: no next episode found
                    } catch (e) {
                        // ignore errors and do nothing
                    }
                };

                if (progBar) {
                    // Improved scrub/seek handling:
                    // - Use pointer events so scrubbing doesn't cause play()/pause() race conditions
                    // - Pause the video when user starts scrubbing, set target time while dragging, then seek once released
                    // - Resume playback only if it was playing before the scrub, and swallow play() promise rejections
                    let wasPlayingBeforeScrub = false;
                    let pendingTargetPct = null;

                    const updateFill = (pct) => {
                        try { if (fill) fill.style.width = `${pct}%`; } catch (_) {}
                    };

                    // input updates visual feedback immediately but does not perform an intrusive seek
                    progBar.addEventListener('input', (e) => {
                        try {
                            const pct = Number(e.target.value) || 0;
                            pendingTargetPct = pct;
                            this.isSeeking = true;
                            updateFill(pct);
                        } catch (_) {}
                    }, { passive: true });

                    // When user starts interacting with the thumb, record playing state and pause to avoid play/pause races
                    progBar.addEventListener('pointerdown', (e) => {
                        try {
                            if (!this.vid) return;
                            wasPlayingBeforeScrub = !this.vid.paused;
                            // do not call pause() here to avoid play()/pause() race conditions that can
                            // generate unhandled promise rejections and freeze playback; actual pause/resume
                            // is handled after the seek on pointerup.
                            try { if (e && e.target && typeof e.target.setPointerCapture === 'function') e.target.setPointerCapture(e.pointerId); } catch(_) {}
                        } catch(_) {}
                    }, { passive: true });

                    // On pointerup (release), compute final target and perform a single seek operation, then resume if needed.
                    progBar.addEventListener('pointerup', (e) => {
                        try {
                            if (!this.vid) { this.isSeeking = false; pendingTargetPct = null; return; }
                            const pct = (pendingTargetPct != null) ? pendingTargetPct : (Number(e.target.value) || 0);
                            const dur = this.vid.duration || 0;
                            const targetTime = (!isNaN(dur) && dur > 0) ? (pct / 100) * dur : 0;

                            // perform the seek in a defensive way
                            try {
                                // Attempt direct set; if it fails, schedule a tiny retry
                                this.vid.currentTime = targetTime;
                            } catch (err) {
                                setTimeout(() => {
                                    try { if (this.vid) this.vid.currentTime = targetTime; } catch(_) {}
                                }, 60);
                            }

                            // small UI update to ensure times reflect the new position quickly
                            requestAnimationFrame(() => {
                                try {
                                    const tc = document.getElementById('time-current');
                                    const td = document.getElementById('time-duration');
                                    if (tc) tc.innerText = formatTime(targetTime);
                                    if (td && !isNaN(dur)) td.innerText = formatTime(dur);
                                    updateFill(pct);
                                } catch (_) {}
                            });

                            // reset seeking flag and resume playback only if it was playing before scrub
                            this.isSeeking = false;
                            const resumeIfNeeded = () => {
                                try {
                                    if (wasPlayingBeforeScrub) {
                                        // swallow promise rejections to avoid unhandledRejection (play interrupted by pause)
                                        this.vid.play().catch(() => {});
                                    }
                                } catch (_) {}
                            };

                            // Some browsers restrict immediate play after setting currentTime; do resume on next tick
                            setTimeout(resumeIfNeeded, 30);
                            pendingTargetPct = null;

                            try { if (e && e.target && typeof e.target.releasePointerCapture === 'function') e.target.releasePointerCapture(e.pointerId); } catch(_) {}
                        } catch (_) {
                            this.isSeeking = false;
                            pendingTargetPct = null;
                        }
                    }, { passive: true });

                    // Also support keyboard change events (accessible): perform the seek and keep previous play state behavior
                    progBar.addEventListener('change', (e) => {
                        try {
                            if (!this.vid) return;
                            const pct = Number(e.target.value) || 0;
                            const dur = this.vid.duration || 0;
                            const targetTime = (!isNaN(dur) && dur > 0) ? (pct / 100) * dur : 0;

                            const wasPlaying = !this.vid.paused;
                            try { this.vid.pause(); } catch(_) {}
                            try { this.vid.currentTime = targetTime; } catch (err) { setTimeout(()=>{ try{ this.vid.currentTime = targetTime; }catch(_){} }, 60); }
                            requestAnimationFrame(() => updateFill(pct));
                            // resume if it was playing
                            setTimeout(() => { try { if (wasPlaying) this.vid.play().catch(()=>{}); } catch(_){} }, 30);
                        } catch (_) {}
                    }, { passive: true });
                }

                const volEl = document.getElementById('volume-bar');
                if (volEl) {
                    volEl.oninput = (e) => {
                        if (!this.vid) return;
                        this.vid.volume = e.target.value; this.vid.muted = (e.target.value == 0); updateVolIcon();
                    };
                }

                // Ensure controls show initially and auto-hide when playing
                showControls();

                // expose helpers for external debugging if needed
                this._showControls = showControls;
                this._hideControls = hideControls;
            },

            checkNextTrigger: function() {
                // support native video and YouTube iframe players for next-episode prompt
                if (!this.context || this.nextPromptShown) return;

                let cur = 0, dur = 0;
                try {
                    if (this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function' && typeof this.ytPlayer.getDuration === 'function') {
                        cur = Number(this.ytPlayer.getCurrentTime()) || 0;
                        dur = Number(this.ytPlayer.getDuration()) || 0;
                    } else if (this.vid) {
                        cur = Number(this.vid.currentTime) || 0;
                        dur = Number(this.vid.duration) || 0;
                    } else {
                        return;
                    }
                } catch (e) {
                    return;
                }

                // require a valid numeric duration and a positive trigger value
                const trigger = Number(this.context.trigger) || 0;
                if (isNaN(dur) || dur <= 0 || trigger <= 0) return;

                if (dur - cur <= trigger) {
                    this.nextPromptShown = true;

                    // Mark episode as "considered finished" when near the trigger without stopping playback:
                    // set progress time to duration (or dur - 0.5 for safety) and flag completed, then persist.
                    try {
                        const safeTime = Math.max(0, Math.max(0, dur - 0.5));
                        if (this.context && this.context.id) {
                            state.progress[this.context.id] = state.progress[this.context.id] || {};
                            state.progress[this.context.id].time = safeTime;
                            state.progress[this.context.id].duration = dur;
                            state.progress[this.context.id].completed = true;
                            state.progress[this.context.id].timestamp = Date.now();
                            // update series history as completed
                            if (this.context.type === 'serie' && this.context.seriesId) {
                                state.history[this.context.seriesId] = {
                                    s: this.context.season,
                                    e: this.context.episode,
                                    epId: this.context.id,
                                    timestamp: Date.now(),
                                    completed: true
                                };
                            }
                            // persist (debounced)
                            saveProgressData();
                        }
                    } catch (e) {
                        // silent fallback - do not interrupt playback
                    }

                    // Build nextEp prompt: if explicit nextEp exists use it; otherwise, if this is the last episode of season,
                    // try to locate the next season's first episode and use that as nextEp so player can jump to next season automatically.
                    const seriesData = db.find(i => i.id === this.context.seriesId);
                    let nextContext = this.context.nextEp || null;
                    try {
                        if (!nextContext && seriesData && typeof this.context.season !== 'undefined' && typeof this.context.episode !== 'undefined') {
                            const sNum = Number(this.context.season);
                            const eIdx = Number(this.context.episode);
                            const seasonArr = (seriesData.seasons && seriesData.seasons[sNum]) ? seriesData.seasons[sNum] : [];
                            // if this is last episode in current season, check for next season's first ep
                            if (eIdx + 1 >= seasonArr.length) {
                                const nextSeasonNum = String(sNum + 1);
                                const nextSeasonArr = seriesData.seasons && seriesData.seasons[nextSeasonNum] ? seriesData.seasons[nextSeasonNum] : null;
                                if (nextSeasonArr && nextSeasonArr.length > 0) {
                                    const firstEp = nextSeasonArr[0];
                                    const stableEpId = (firstEp && firstEp.id) ? firstEp.id : `${seriesData.id}-s${nextSeasonNum}-e0`;
                                    nextContext = { url: firstEp.url, title: `T${nextSeasonNum}:E1 - ${firstEp.title}`, s: nextSeasonNum, e: 0, id: stableEpId };
                                    // also set a lightweight nextEp on the player.context for UI consistency
                                    try { this.context.nextEp = nextContext; } catch(_) {}
                                }
                            }
                        }
                    } catch (_) {
                        // ignore errors, proceed with whatever nextContext we have
                    }

                    if (nextContext) {
                        const prompt = document.getElementById('next-ep-prompt');
                        document.getElementById('next-ep-title').innerText = (nextContext.title || '').split(' - ')[1] || nextContext.title || '';
                        const seriesCover = seriesData ? seriesData.cover : '';
                        if (seriesCover) document.getElementById('next-ep-img').src = seriesCover;
                        prompt.classList.remove('hidden');
                        requestAnimationFrame(() => prompt.classList.remove('opacity-0', 'translate-y-4'));
                    }
                }
            },

            // Show/hide the skip-intro button based on current playback time and the intro window in context.
            // Accepts an optional currentTime param (seconds). If not provided, it will query the active player.
            updateSkipIntroVisibility: function(currentTime) {
                try {
                    const skipBtn = document.getElementById('skip-intro-btn');
                    if (!skipBtn) return;

                    // Must have context with intro metadata
                    if (!this.context || (typeof this.context.introStart === 'undefined' && typeof this.context.introDuration === 'undefined')) {
                        skipBtn.style.display = 'none';
                        return;
                    }

                    const introStart = Number(this.context.introStart || 0);
                    const introDur = Number(this.context.introDuration || 0);
                    if (introStart <= 0 || introDur <= 0) {
                        skipBtn.style.display = 'none';
                        return;
                    }

                    // Determine current time if not supplied
                    let cur = typeof currentTime === 'number' ? currentTime : 0;
                    if (typeof currentTime !== 'number') {
                        try {
                            if (this.isYouTube && this.ytPlayer && typeof this.ytPlayer.getCurrentTime === 'function') {
                                cur = Number(this.ytPlayer.getCurrentTime()) || 0;
                            } else if (this.vid) {
                                cur = Number(this.vid.currentTime) || 0;
                            }
                        } catch (_) { cur = 0; }
                    }

                    // Show the button during the full intro interval and hide outside it.
                    const introEnd = introStart + introDur;
                    if (cur >= introStart && cur <= introEnd) {
                        skipBtn.style.display = '';
                    } else {
                        skipBtn.style.display = 'none';
                    }
                } catch (e) {
                    // fail-safe: hide on errors
                    try { document.getElementById('skip-intro-btn').style.display = 'none'; } catch(_) {}
                }
            }
        };

        function openPlayer(url, title, context) { player.init(url, title, context); }
        function closePlayer() {
            // Close player cleanup (safe-guarded)
            try {
                // prefer the player's close if available
                try { if (player && typeof player.close === 'function') player.close(); }
                catch (err) { try { player && player.close && player.close(); } catch(_) {} }
            } catch (e) { /* ignore */ }

            // Ensure keyboard handlers cleared
            try { window.onkeydown = null; } catch(_) {}

            // Immediately persist any remaining progress/history and update UI synchronously so "Continuar Assistindo"
            // reflects the most recent state as soon as the player is closed.
            try {
                // best-effort save via player's saveProgress
                try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch(_) {}

                // FLUSH: write progress/history to localStorage synchronously to avoid debounce delay
                try {
                    // prefer the debounced saver, but force write now to guarantee resume correctness
                    if (typeof state !== 'undefined') {
                        try { localStorage.setItem('lumina_v2_prog', JSON.stringify(state.progress || {})); } catch(_) {}
                        try { localStorage.setItem('lumina_v2_hist', JSON.stringify(state.history || {})); } catch(_) {}
                    } else {
                        try { saveProgressData(); } catch(_) {}
                    }
                } catch(_) {
                    try { saveProgressData(); } catch(_) {}
                }

                // Re-render immediately so UI (continue cards / episode bars) reflect the just-saved progress
                try { renderView(); } catch(_) {}
            } catch (e) { /* ignore */ }

            // Show rotate-to-vertical modal after closing the player unless the user disabled orientation prompts
            try {
                // Respect global orientation-disable toggle: if disabled, skip showing this prompt
                if (getOrientationDisabled && getOrientationDisabled()) {
                    // restore body overflow and exit early
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    return;
                }

                // Only show rotate/vertical prompt on Android or iOS mobile OS (avoid showing on desktop)
                if (!isMobileOS()) {
                    // ensure body overflow restored for non-mobile environments
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    return;
                }

                const modal = document.getElementById('rotate-vertical-modal');
                if (!modal) return;

                // populate dynamic hint based on current orientation
                const hint = modal.querySelector('.rotate-hint');
                if (hint) {
                    const isPortrait = window.innerHeight > window.innerWidth;
                    hint.innerText = isPortrait ? 'Você está em modo retrato — gire para assistir em tela cheia.' : 'Fechou o player — gire seu dispositivo para voltar à navegação vertical.';
                }

                // make it visible with entrance animation
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                // small delay to trigger transition
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modal.classList.add('scale-100');
                }, 12);

                // prevent background scroll while prompt visible
                document.body.style.overflow = 'hidden';

                // attach a one-time resize listener: if user rotates back to portrait, hide prompt
                const onRotateBack = () => {
                    if (window.innerHeight > window.innerWidth) {
                        dismissRotateVertical();
                        window.removeEventListener('resize', onRotateBack);
                    }
                };
                window.addEventListener('resize', onRotateBack);
            } catch (e) { /* silent */ }
        }

        // Dismiss the rotate-to-vertical prompt (will hide when device is back in portrait)
        function dismissRotateVertical() {
            try {
                const modal = document.getElementById('rotate-vertical-modal');
                if (!modal) return;
                modal.classList.add('opacity-0');
                // small timeout to allow CSS transition
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                    // restore body scroll if nothing else is blocking it
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                }, 260);
            } catch (e) { /* silent */ }
        }

        // Show rotate-to-vertical modal after any programmatic close (used by player.close paths)
        function showRotateAfterClose() {
            try {
                // Respect global orientation-disable toggle: if disabled, skip showing this prompt
                if (getOrientationDisabled && getOrientationDisabled()) {
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    return;
                }

                if (!isMobileOS()) {
                    if (document.getElementById('player-modal').classList.contains('hidden') && document.getElementById('details-modal').classList.contains('hidden')) {
                        document.body.style.overflow = '';
                    }
                    return;
                }

                const modal = document.getElementById('rotate-vertical-modal');
                if (!modal) return;

                const hint = modal.querySelector('.rotate-hint');
                if (hint) {
                    const isPortrait = window.innerHeight > window.innerWidth;
                    hint.innerText = isPortrait ? 'Você está em modo retrato — gire para assistir em tela cheia.' : 'Fechou o player — gire seu dispositivo para voltar à navegação vertical.';
                }

                modal.classList.remove('hidden');
                modal.classList.add('flex');
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                    modal.classList.add('scale-100');
                }, 12);

                document.body.style.overflow = 'hidden';

                const onRotateBack = () => {
                    if (window.innerHeight > window.innerWidth) {
                        dismissRotateVertical();
                        window.removeEventListener('resize', onRotateBack);
                    }
                };
                window.addEventListener('resize', onRotateBack);
            } catch (e) { /* silent */ }
        }

        // Acknowledge button handler (disabled — non-dismissible)
        function acknowledgeRotate() {
            // intentionally left blank; acknowledgement does not close the modal
        }
        function togglePlay() {
            // unified play/pause for native video and YouTube iframe player with robust promise handling
            try {
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.getPlayerState === 'function') {
                    const st = player.ytPlayer.getPlayerState();
                    // YT states: 1 playing, 2 paused, 0 ended
                    if (st === YT.PlayerState.PLAYING) {
                        try { player.ytPlayer.pauseVideo(); } catch(_) {}
                        updatePlayBtns(true);
                    } else {
                        try { player.ytPlayer.playVideo(); } catch(_) {}
                        updatePlayBtns(false);
                    }
                    return;
                }
            } catch (e) { /* failover to native */ }

            if (player.vid) {
                try {
                    if (player.vid.paused) {
                        // call play and swallow any promise rejection to avoid unhandledRejection when a pause occurs immediately
                        const p = player.vid.play();
                        if (p && typeof p.then === 'function') p.catch(() => {});
                        updatePlayBtns(false);
                    } else {
                        try { player.vid.pause(); } catch(_) {}
                        updatePlayBtns(true);
                    }
                } catch (err) {
                    // last-resort: avoid throwing from toggle
                    try { player.vid && player.vid.pause && player.vid.pause(); } catch(_) {}
                    updatePlayBtns(true);
                }
            }
        }

        function skipVideo(s) {
            // Optimized unified skip handler: minimal blocking work, immediate UI frame updates, and throttled progress save.
            try {
                // Helper to clamp a value safely
                const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
                // Prefer YouTube API when available
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.getCurrentTime === 'function') {
                    let cur = 0, dur = 0;
                    try { cur = Number(player.ytPlayer.getCurrentTime()) || 0; } catch(_) { cur = 0; }
                    try { dur = Number(player.ytPlayer.getDuration()) || 0; } catch(_) { dur = 0; }

                    let target = Number(cur) + Number(s || 0);
                    if (isNaN(target)) target = cur;
                    target = clamp(target, 0, (dur > 0 ? dur : Number.POSITIVE_INFINITY));

                    // perform seek quickly and non-blocking
                    try {
                        if (typeof player.ytPlayer.seekTo === 'function') player.ytPlayer.seekTo(target, true);
                    } catch (_) {}

                    // update UI immediately on next animation frame for smooth sync
                    requestAnimationFrame(() => {
                        try {
                            const tc = document.getElementById('time-current');
                            const td = document.getElementById('time-duration');
                            const progBar = document.getElementById('progress-bar');
                            const fill = document.getElementById('progress-fill');
                            if (tc) tc.innerText = formatTime(target);
                            if (td && dur) td.innerText = formatTime(dur);
                            if (progBar && dur > 0) progBar.value = (target / dur) * 100;
                            if (fill && dur > 0) fill.style.width = ((target / dur) * 100) + '%';
                        } catch (_) {}
                    });

                    // persist a lightweight progress snapshot asynchronously (debounced inside saveProgressData)
                    try {
                        if (player.context && player.context.id) {
                            // avoid heavy localStorage calls here; update in-memory and schedule save
                            state.progress[player.context.id] = state.progress[player.context.id] || {};
                            state.progress[player.context.id].time = target;
                            state.progress[player.context.id].duration = dur || (state.progress[player.context.id].duration || 0);
                            state.progress[player.context.id].timestamp = Date.now();
                            if (player.context.type === 'serie' && player.context.seriesId) {
                                state.history[player.context.seriesId] = { s: player.context.season, e: player.context.episode, epId: player.context.id, timestamp: Date.now() };
                            }
                            // schedule debounced merge-save then call player.saveProgress to persist immediately
                            saveProgressData();
                            try { if (player && typeof player.saveProgress === 'function') player.saveProgress(); } catch(_) {}
                        }
                    } catch (_) {}

                    return;
                }
            } catch (e) {
                // continue to native fallback
            }

            // Native HTMLVideoElement path (fast and defensive)
            try {
                const vid = player.vid;
                if (!vid) return;
                const cur = Number(vid.currentTime) || 0;
                const dur = Number(vid.duration) || NaN;
                let target = cur + Number(s || 0);
                if (isNaN(target)) target = cur;
                if (target < 0) target = 0;
                if (!isNaN(dur) && dur > 0 && target > dur) target = dur;

                // set currentTime inside try/catch; browsers may throw if seeking during certain states
                try { vid.currentTime = target; } catch (err) {
                    // fallback: attempt a small delayed seek if immediate seek fails
                    try { setTimeout(() => { try { if (player.vid) player.vid.currentTime = target; } catch(_) {} }, 80); } catch(_) {}
                }

                // schedule UI update on next frame for smoothness and to avoid layout thrash
                requestAnimationFrame(() => {
                    try {
                        const tc = document.getElementById('time-current');
                        const td = document.getElementById('time-duration');
                        const progBar = document.getElementById('progress-bar');
                        const fill = document.getElementById('progress-fill');
                        if (tc) tc.innerText = formatTime(target);
                        if (td && !isNaN(dur)) td.innerText = formatTime(dur);
                        if (progBar && !isNaN(dur) && dur > 0) progBar.value = (target / dur) * 100;
                        if (fill && !isNaN(dur) && dur > 0) fill.style.width = ((target / dur) * 100) + '%';
                    } catch (_) {}
                });

                // update in-memory progress and schedule a debounced persistent save for performance
                try {
                    if (player.context && player.context.id) {
                        const pid = player.context.id;
                        const prev = state.progress[pid] || {};
                        const prevTime = (typeof prev.time === 'number') ? prev.time : -1;
                        if (prevTime >= 0 && target < prevTime - 1) {
                            // prevent regression: keep previous time but refresh timestamp
                            prev.timestamp = Date.now();
                            state.progress[pid] = prev;
                        } else {
                            state.progress[pid] = state.progress[pid] || {};
                            state.progress[pid].time = target;
                            state.progress[pid].duration = (!isNaN(dur) && dur > 0) ? dur : (state.progress[pid].duration || 0);
                            state.progress[pid].timestamp = Date.now();
                        }

                        if (player.context.type === 'serie' && player.context.seriesId) {
                            state.history[player.context.seriesId] = { s: player.context.season, e: player.context.episode, epId: player.context.id, timestamp: Date.now() };
                        }
                        // defer writes via the shared saveProgressData debounce
                        saveProgressData();
                    }
                } catch (_) {}

            } catch (e) {
                // silent fallback
            }
        }

        function setSpeed(r) {
            // normalize input and persist chosen rate
            const rate = Number(r) || 1;
            player.preferredRate = rate;
            const btn = document.getElementById('speed-btn');
            if (btn) btn.innerText = rate + 'x';

            // update menu visual selection
            const menu = document.getElementById('speed-menu');
            if (menu) {
                Array.from(menu.querySelectorAll('button[data-speed]')).forEach(b => {
                    if (Number(b.getAttribute('data-speed')) === rate) {
                        b.classList.add('text-accent', 'font-semibold');
                    } else {
                        b.classList.remove('text-accent', 'font-semibold');
                    }
                });
            }

            // apply to YouTube player if present (guarded)
            try {
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.setPlaybackRate === 'function') {
                    try { player.ytPlayer.setPlaybackRate(player.preferredRate); } catch(_) {}
                }
            } catch (e) { /* ignore */ }

            // apply to native video if present
            try {
                if (player.vid) {
                    player.vid.playbackRate = player.preferredRate;
                }
            } catch (e) { /* ignore */ }
        }

        // Speed menu: open/close behavior so mouse clicks don't close it immediately.
        (function(){
            const wrapper = document.getElementById('speed-control-wrapper');
            const btn = document.getElementById('speed-btn');
            const menu = document.getElementById('speed-menu');

            if (!btn || !menu) return;

            // Toggle menu on button click
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = !menu.classList.contains('hidden');
                if (isOpen) {
                    menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false');
                } else {
                    menu.classList.remove('hidden'); btn.setAttribute('aria-expanded', 'true');
                }
            }, { passive: true });

            // Delegate clicks inside menu to setSpeed and keep menu open briefly for feedback then close
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
                const target = e.target.closest('button[data-speed]');
                if (!target) return;
                const s = Number(target.getAttribute('data-speed')) || 1;
                setSpeed(s);
                // keep menu visible very briefly then close to show feedback
                setTimeout(() => { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); }, 220);
            });

            // Close menu when clicking outside or pressing Escape
            document.addEventListener('click', () => { if (!menu.classList.contains('hidden')) { menu.classList.add('hidden'); btn.setAttribute('aria-expanded','false'); } }, { passive: true });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.classList.contains('hidden')) { menu.classList.add('hidden'); btn.setAttribute('aria-expanded','false'); } });

            // initialize label from stored preferredRate if available
            try {
                if (player && typeof player.preferredRate === 'number') setSpeed(player.preferredRate);
                else setSpeed(1);
            } catch(_) { setSpeed(1); }
        })();
        function toggleMute() { 
            if(player.vid) { 
                player.vid.muted = !player.vid.muted; 
                document.getElementById('volume-bar').value = player.vid.muted ? 0 : player.vid.volume || 1;
                updateVolIcon(); 
            } 
        }
        function toggleFullscreen() {
            const m = document.getElementById('player-modal');
            !document.fullscreenElement ? m.requestFullscreen().catch(e=>e) : document.exitFullscreen();
        }

        // Skip intro: seeks past saved intro metadata (works for native video and YouTube iframe)
        function skipIntro() {
            try {
                if (!player || !player.context) {
                    showToast('Nenhum episódio com abertura disponível.');
                    return;
                }
                const start = Number(player.context.introStart || 0);
                const dur = Number(player.context.introDuration || 0);
                if (!start || !dur) {
                    showToast('Nenhum dado de abertura encontrado para este episódio.');
                    return;
                }
                const target = start + dur;
                // YouTube
                if (player.isYouTube && player.ytPlayer && typeof player.ytPlayer.seekTo === 'function') {
                    try { player.ytPlayer.seekTo(target, true); showToast('Abertura pulada.'); } catch (_) { showToast('Falha ao pular abertura.'); }
                    return;
                }
                // native video
                if (player.vid) {
                    try { player.vid.currentTime = target; showToast('Abertura pulada.'); } catch (e) { showToast('Falha ao pular abertura.'); }
                    return;
                }
                // iframe fallback: cannot seek reliably
                showToast('Não é possível pular abertura neste tipo de embed.');
            } catch (e) {
                console.warn('skipIntro failed', e);
                showToast('Erro ao tentar pular abertura.');
            }
        }

        // Picture-in-Picture toggle for native video (graceful non-blocking fallback)
        async function togglePiP() {
            try {
                // 1) Prefer native HTMLVideoElement for PiP when available
                const vidEl = (player && player.vid) ? player.vid : document.querySelector('#main-video');
                if (vidEl && typeof vidEl.requestPictureInPicture === 'function') {
                    try {
                        if (document.pictureInPictureElement === vidEl) {
                            await document.exitPictureInPicture();
                        } else {
                            await vidEl.requestPictureInPicture();
                        }
                        return;
                    } catch (err) {
                        // continue to other fallbacks if native PiP fails
                        console.warn('Native PiP failed, falling back to iframe attempts', err);
                    }
                }

                // 2) Try iframe-based PiP (works for many embed providers and some YouTube cases)
                // Look for known iframe containers rendered by the player (YouTube container or generic iframe)
                const possibleIframes = Array.from(document.querySelectorAll('#player-media-wrapper iframe, #yt-player iframe'));
                for (const ifr of possibleIframes) {
                    try {
                        if (!ifr) continue;
                        // Ensure allow attribute includes picture-in-picture for best compatibility
                        const curAllow = (ifr.getAttribute('allow') || '');
                        if (!/picture-in-picture/i.test(curAllow)) {
                            try { ifr.setAttribute('allow', (curAllow + '; picture-in-picture').replace(/;;+/g,';')); } catch(_) {}
                        }
                        // Some browsers support requestPictureInPicture on iframe elements
                        if (typeof ifr.requestPictureInPicture === 'function') {
                            if (document.pictureInPictureElement === ifr) {
                                await document.exitPictureInPicture();
                            } else {
                                await ifr.requestPictureInPicture();
                            }
                            return;
                        }
                    } catch (inner) {
                        // try next iframe
                        console.warn('iframe PiP attempt failed for one iframe, trying next', inner);
                    }
                }

                // 3) If we have a YouTube player via API we can try to access its internal iframe (best-effort)
                try {
                    if (player && player.isYouTube) {
                        const ytIframe = document.querySelector('#yt-player iframe');
                        if (ytIframe) {
                            // ensure allow attribute is present
                            const cur = (ytIframe.getAttribute('allow') || '');
                            if (!/picture-in-picture/i.test(cur)) {
                                try { ytIframe.setAttribute('allow', (cur + '; autoplay; picture-in-picture; fullscreen').replace(/;;+/g,';')); } catch(_) {}
                            }
                            if (typeof ytIframe.requestPictureInPicture === 'function') {
                                if (document.pictureInPictureElement === ytIframe) {
                                    await document.exitPictureInPicture();
                                } else {
                                    await ytIframe.requestPictureInPicture();
                                }
                                return;
                            }
                        }
                    }
                } catch (ytErr) {
                    console.warn('YT iframe PiP attempt failed', ytErr);
                }

                // 4) Generic fallback: inform the user PiP isn't available
                if (document.pictureInPictureEnabled) {
                    showToast('Nenhum vídeo compatível encontrado para PiP.');
                } else {
                    showToast('Picture-in-Picture não suportado neste navegador.');
                }
            } catch (e) {
                console.warn('togglePiP overall failed', e);
                showToast('Não foi possível ativar PiP.');
            }
        }

        // small ephemeral toast helper (non-blocking feedback for PiP/fallbacks)
        function showToast(msg, duration = 2200) {
            try {
                let t = document.getElementById('lumina-toast');
                if (!t) {
                    t = document.createElement('div');
                    t.id = 'lumina-toast';
                    t.style.position = 'fixed';
                    t.style.left = '50%';
                    t.style.transform = 'translateX(-50%)';
                    t.style.bottom = '18px';
                    t.style.zIndex = '99999';
                    t.style.padding = '10px 14px';
                    t.style.background = 'rgba(0,0,0,0.7)';
                    t.style.color = 'white';
                    t.style.borderRadius = '12px';
                    t.style.fontSize = '13px';
                    t.style.backdropFilter = 'blur(6px)';
                    t.style.boxShadow = '0 8px 30px rgba(0,0,0,0.55)';
                    document.body.appendChild(t);
                }
                t.innerText = msg;
                t.style.opacity = '1';
                // reset hide timer
                if (t._hideTimer) clearTimeout(t._hideTimer);
                t._hideTimer = setTimeout(() => {
                    t.style.transition = 'opacity 260ms ease';
                    t.style.opacity = '0';
                    setTimeout(() => {
                        try { t.remove(); } catch(_) {}
                    }, 300);
                }, duration);
            } catch (e) { /* ignore */ }
        }

        // Google Cast integration: load sender SDK and provide openCast / playOnTV helpers
        (function(){
            // Insert Cast SDK script tag (non-blocking)
            const castScriptUrl = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
            if (!document.querySelector(`script[src="${castScriptUrl}"]`)) {
                const s = document.createElement('script');
                s.src = castScriptUrl;
                s.async = true;
                document.head.appendChild(s);
            }

            // Exposed helper to open Cast chooser and then load current media
            window.openCast = function() {
                try {
                    // If Cast SDK not yet available, show a non-blocking toast instead of opening legal modal
                    if (!window.cast || !window.cast.framework) {
                        showToast('Cast SDK indisponível neste dispositivo.');
                        return;
                    }
                    // ensure SDK initialized
                    initializeCast();
                    // request a session (this will show the native picker)
                    const ctx = cast.framework.CastContext.getInstance();
                    ctx.requestSession().then(() => {
                        // after session is created, attempt to play current media on TV
                        playOnTV();
                    }).catch(() => {
                        // user cancelled or session failed; notify lightly
                        showToast('Sessão Cast não iniciada.');
                    });
                } catch (e) {
                    // fallback UX: show toast
                    showToast('Não foi possível iniciar o Cast.');
                }
            };

            // safe initializer called by the SDK callback or on demand
            window.initializeCast = function() {
                try {
                    if (!window.cast || !window.cast.framework) return;
                    const ctx = cast.framework.CastContext.getInstance();
                    // avoid re-setting options repeatedly
                    if (!ctx._lumina_cast_initialized) {
                        ctx.setOptions({
                            receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                            autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
                        });
                        ctx._lumina_cast_initialized = true;
                    }
                } catch (e) { /* ignore init errors */ }
            };

            // The SDK calls this when available
            window['__onGCastApiAvailable'] = function(isAvailable) {
                if (isAvailable) {
                    try { initializeCast(); } catch (e) {}
                }
            };

            // Play current player media on TV (uses player.context.url or native video src)
            window.playOnTV = async function() {
                try {
                    if (!window.cast || !window.cast.framework) {
                        // Cast SDK not available — do not open legal modal; provide non-blocking feedback
                        showToast('Cast não disponível neste dispositivo.');
                        return;
                    }
                    const ctx = cast.framework.CastContext.getInstance();
                    const session = ctx.getCurrentSession();
                    if (!session) {
                        // no session: open chooser first
                        try {
                            await ctx.requestSession();
                        } catch (e) {
                            // user cancelled or session failed — just notify
                            showToast('Sessão Cast não iniciada.');
                            return;
                        }
                    }

                    const finalSession = ctx.getCurrentSession();
                    if (!finalSession) {
                        showToast('Nenhuma sessão Cast ativa.');
                        return;
                    }

                    // determine a usable media URL and MIME type
                    let mediaUrl = null;
                    let mime = 'video/mp4';

                    if (player && player.context && player.context.url) mediaUrl = player.context.url;
                    else {
                        const vid = player && player.vid ? player.vid : document.querySelector('#main-video');
                        if (vid && (vid.currentSrc || vid.src)) {
                            mediaUrl = vid.currentSrc || vid.src;
                            // attempt to infer mime from extension
                            const ext = (mediaUrl.split('?')[0].split('.').pop() || '').toLowerCase();
                            if (ext === 'webm') mime = 'video/webm';
                            if (ext === 'm3u8') mime = 'application/x-mpegURL';
                        }
                    }

                    if (!mediaUrl) {
                        showToast('Nenhuma mídia disponível para transmitir.');
                        return;
                    }

                    // build MediaInfo and LoadRequest
                    const mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, mime);
                    // optional metadata
                    if (player && player.context) {
                        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
                        mediaInfo.metadata.title = (player && player.context && (player.context.seriesTitle || player.context.title)) || document.getElementById('player-ep-title')?.innerText || '';
                        mediaInfo.metadata.subtitle = (player && player.context && (player.context.seriesTitle || '')) || '';
                        // poster
                        let poster = null;
                        if (player && player.context && player.context.seriesId) {
                            const seriesData = db.find(i => i.id === player.context.seriesId);
                            poster = seriesData ? seriesData.cover : null;
                        }
                        if (!poster && db && db.length) {
                            // fallback to hero or first in DB
                            poster = (db.find(i => i.id === (player && player.context && player.context.seriesId)) || db[0]).cover;
                        }
                        if (poster) mediaInfo.metadata.images = [{ url: poster }];
                    }

                    const request = new chrome.cast.media.LoadRequest(mediaInfo);
                    finalSession.loadMedia(request).then(() => {
                        // optional: notify user briefly
                        showToast('Reproduzindo na TV');
                    }).catch((err) => {
                        console.warn('Cast load failed', err);
                        showToast('Não foi possível reproduzir na TV.');
                    });
                } catch (e) {
                    console.warn('playOnTV failed', e);
                    // always avoid opening legal modal from the Cast flow; show a gentle toast instead
                    showToast('Erro ao tentar transmitir na TV.');
                }
            };
        })();
        // AirPlay helper: on iOS/Safari call webkitShowPlaybackTargetPicker on the currently playing video element
        window.playOnAirPlay = function() {
            try {
                // find the active native video element used by the player
                const vid = (player && player.vid) ? player.vid : document.querySelector('#main-video');
                if (!vid) {
                    showToast('Nenhum vídeo ativo para AirPlay.');
                    return;
                }
                // webkitShowPlaybackTargetPicker triggers the native AirPlay target picker in Safari/iOS
                if (typeof vid.webkitShowPlaybackTargetPicker === 'function') {
                    vid.webkitShowPlaybackTargetPicker();
                } else {
                    showToast('AirPlay não disponível neste dispositivo.');
                }
            } catch (e) {
                console.warn('AirPlay failed', e);
                showToast('Não foi possível abrir o AirPlay.');
            }
        };

        function updatePlayBtns(p) {
            const i = p ? 'ph-play' : 'ph-pause';
            const center = document.getElementById('center-play-btn');
            const bottom = document.getElementById('bottom-play-btn');
            if(center) center.innerHTML = `<i class="ph-fill ${i}"></i>`;
            if(bottom) bottom.innerHTML = `<i class="ph-fill ${i} text-2xl"></i>`;
        }
        function updateVolIcon() {
            const b = document.getElementById('mute-btn');
            const v = player.vid;
            if(!v) { b.innerHTML = '<i class="ph-fill ph-speaker-high text-xl"></i>'; return; }
            if(v.muted || v.volume === 0) b.innerHTML = '<i class="ph-fill ph-speaker-x text-xl text-white/50"></i>';
            else if(v.volume < 0.5) b.innerHTML = '<i class="ph-fill ph-speaker-low text-xl"></i>';
            else b.innerHTML = '<i class="ph-fill ph-speaker-high text-xl"></i>';
        }
        function formatTime(s) {
            if (isNaN(s)) return "00:00";
            const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
            return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}` : `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        }

        function dismissNextEp(instant = false) {
            const prompt = document.getElementById('next-ep-prompt');
            prompt.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => prompt.classList.add('hidden'), instant ? 0 : 500);
        }

        function playNextEpisode() {
            if(!player.context || !player.context.nextEp) return;
            if(!player.isEmbed) player.saveProgress();
            
            const nextCtx = player.context.nextEp;
            const seriesData = db.find(i => i.id === player.context.seriesId);
            const epData = seriesData.seasons[nextCtx.s][nextCtx.e];
            
            const nNextE = nextCtx.e + 1 < seriesData.seasons[nextCtx.s].length ? seriesData.seasons[nextCtx.s][nextCtx.e+1] : null;
            const newNextCtx = nNextE && nNextE.url ? { url: nNextE.url, title: `T${nextCtx.s}:E${nextCtx.e+2} - ${nNextE.title}`, s: nextCtx.s, e: nextCtx.e+1 } : null;
            
            const fullContext = {
                type: 'serie', seriesId: seriesData.id, seriesTitle: seriesData.title,
                season: nextCtx.s, episode: nextCtx.e, id: epData.id,
                trigger: seriesData.nextEpisodeTrigger || 0, nextEp: newNextCtx, url: epData.url
            };

            dismissNextEp(true); if(player.vid) player.vid.pause();
            player.init(epData.url, nextCtx.title, fullContext);
            changeSeason(seriesData.id, nextCtx.s);
        }

        // helper: scroll a session horizontally
        function scrollCards(containerId, dir = 1) {
            const el = document.getElementById(containerId);
            if (!el) return;
            const w = el.clientWidth || (window.innerWidth * 0.8);
            el.scrollBy({ left: dir * (w * 0.8), behavior: 'smooth' });
        }

        // mobile: toggle collapse sections with smooth max-height + caret rotation animation
        function toggleSectionMobile(sectionId) {
            const sec = document.getElementById(sectionId);
            if (!sec) return;
            const body = sec.querySelector('.session-body');
            const btn = sec.querySelector('.mobile-toggle-btn');
            const isCollapsed = sec.classList.contains('mobile-collapsed');

            // Prepare button content and rotated caret element
            if (btn) {
                // ensure structure: <i class="caret ..."></i><span>...</span>
                const open = isCollapsed; // we're about to open when collapsed
                btn.innerHTML = `<i class="ph caret ${open ? 'ph-caret-up' : 'ph-caret-down'} text-white/60"></i><span class="text-white/70 text-sm">${open ? 'Fechar' : 'Abrir'}</span>`;
            }

            // Animate max-height for smooth collapse/expand
            if (!body) {
                sec.classList.toggle('mobile-collapsed');
                return;
            }

            if (isCollapsed) {
                // OPEN: remove collapsed class so CSS allows big max-height; set explicit max-height from scrollHeight for transition
                sec.classList.remove('mobile-collapsed');
                const fullH = body.scrollHeight;
                body.style.maxHeight = fullH + 'px';
                // after transition ends, clear inline max-height to be flexible
                setTimeout(() => { body.style.maxHeight = ''; }, 400);
            } else {
                // CLOSE: set current height then animate to 0
                const curH = body.scrollHeight;
                body.style.maxHeight = curH + 'px';
                // next frame collapse
                requestAnimationFrame(() => {
                    body.style.maxHeight = '0px';
                    // after transition complete, mark as collapsed to apply final styles
                    setTimeout(() => {
                        sec.classList.add('mobile-collapsed');
                    }, 360);
                });
            }
        }

        // When rendering card lists, ensure items are wrapped as session-card to keep side-by-side layout
        const origRender16by9 = render16by9CatalogCards;
        render16by9CatalogCards = function(data, container) {
            if (!container) return;
            // Always render cards as session-card so trends match Continue Watching sizing
            const useSessionCard = true;
            
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = useSessionCard ? 'hover-card cursor-pointer group relative session-card' : 'hover-card cursor-pointer group relative';
                card.onclick = () => openDetails(item.id);

                // build tags badges HTML if present
                // Only show a single badge per item (use first tag when present) and map it to a colorful class.
                // Suppress badges when rendering inside the favorites grid (fav-grid)
                const tag = (item.tags && Array.isArray(item.tags) && item.tags.length) ? item.tags[0] : null;
                const tagToClass = (t) => {
                    if (!t) return 'badge-gray';
                    const key = String(t).toLowerCase().trim();

                    // support "Take 1" .. "Take 8" (and variants like "take1", "take-3")
                    const takeMatch = key.match(/take[\s\-]*(\d+)/i);
                    if (takeMatch) {
                        let idx = parseInt(takeMatch[1], 10) || 1;
                        idx = Math.max(1, Math.min(8, idx)); // clamp 1..8
                        return `badge-take${idx}`;
                    }

                    // curated keyword -> badge mapping (wider palette and friendlier tints)
                    if (/lan(ç|c)amento|lançamento|lancamento|novo|estreia/i.test(key)) return 'badge-indigo';
                    if (/popular|em alta|destaque|top|hit/i.test(key)) return 'badge-rose';
                    if (/nova temporada|temporada/i.test(key)) return 'badge-amber';
                    if (/novo episodio|novo episódio|episodio|episódio|episódio novo/i.test(key)) return 'badge-cyan';
                    if (/exclusivo|exclusiva/i.test(key)) return 'badge-pink';
                    if (/comédia|comedia|família|aventura|família/i.test(key)) return 'badge-emerald';
                    if (/animação|animação|animaçao|anima/i.test(key)) return 'badge-teal';
                    if (/ação|acao|aventura/i.test(key)) return 'badge-orange';
                    if (/série|serie|temporada/i.test(key)) return 'badge-indigo';
                    if (/recomendado|recomendação|recomendado para você/i.test(key)) return 'badge-blue';
                    // fallback
                    return 'badge-gray';
                };

                // Determine whether to show badges: hide on favorites grid
                let tagsHtml = '';
                try {
                    const suppressBadges = container && (container.id === 'fav-grid' || container.closest && container.closest('#fav-grid'));
                    if (!suppressBadges && tag) {
                        tagsHtml = `<div class="card-badge ${tagToClass(tag)}">${String(tag)}</div>`;
                    } else {
                        tagsHtml = '';
                    }
                } catch (e) {
                    tagsHtml = tag ? `<div class="card-badge ${tagToClass(tag)}">${String(tag)}</div>` : '';
                }

                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl md:rounded-2xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <!-- Play Icon Hover -->
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                        ${tagsHtml}
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <div class="flex items-center gap-2 mt-1">
                            ${getAgeBadge(item.ageRating)}
                            <p class="text-white/40 text-[11px] truncate">${item.category}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        // ensure continue items render as session-card too
        const origRenderContinue = renderContinueCards;
        renderContinueCards = function(data, container) {
            if(!container) return;
            data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'w-64 md:w-80 shrink-0 hover-card cursor-pointer group session-card';
                card.onclick = () => openDetails(item.id);
                
                const pct = Math.min(100, ((item._prog && item._prog.time) ? (item._prog.time / item._prog.duration) * 100 : 0));
                const subtitle = item._hist ? `T${item._hist.s} : E${item._hist.e+1}` : 'Continuar filme';

                card.innerHTML = `
                    <div class="aspect-video relative rounded-xl overflow-hidden bg-surface mb-3 border border-white/5">
                        <img src="${item.cover}" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" onload="this.classList.add('loaded')">
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div class="w-12 h-12 rounded-full glass flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                                <i class="ph-fill ph-play text-xl ml-0.5"></i>
                            </div>
                        </div>
                        <div class="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
                            <div class="h-full bg-accent" style="width: ${pct}%"></div>
                        </div>
                    </div>
                    <div class="px-1">
                        <h3 class="text-white font-medium text-sm truncate">${item.title}</h3>
                        <p class="text-white/50 text-[11px] mt-0.5">${subtitle}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        };

        // Add extra Home sessions (lazy: use small filters). Appends sections after trends.
        function insertAdditionalSections() {
            try {
                const container = document.getElementById('main-content');
                if(!container || state.tab !== 'home') return;

                // Build a set of IDs to avoid repeating hero + continue items
                const heroId = db[0] ? db[0].id : null;
                const continueIds = getContinueWatching().map(i => i.id);
                const exclude = new Set([heroId, ...continueIds].filter(Boolean));

                // helper to pick items excluding those in exclude set
                const pick = (source, count = 8) => {
                    const out = [];
                    for (let i = 0; i < source.length && out.length < count; i++) {
                        if (!exclude.has(source[i].id)) {
                            out.push(source[i]);
                            exclude.add(source[i].id); // ensure we don't repeat between new sections
                        }
                    }
                    return out;
                };

                const wrap = document.createElement('div');
                wrap.className = 'px-6 md:px-16 relative z-20 mb-20 animate-slide-up';

                // Novidades: pick starting a bit later to reduce duplication with top of catalog
                const novidades = pick(db.slice(4).concat(db.slice(0,4)), 8);
                // Comédias: filter by category then pick excluding already used
                const comediasPool = db.filter(i => (i.category || '').toLowerCase().includes('comédia'));
                const comedias = pick(comediasPool, 8);
                // Recomendados: high-rated first, then pick excluding used
                const recomendadosPool = db.filter(i => i.ratings && i.ratings.imdb).sort((a,b)=> (b.ratings.imdb||0)-(a.ratings.imdb||0));
                const recomendados = pick(recomendadosPool.length ? recomendadosPool : db, 8);

                const isMobile = window.innerWidth <= 767;

                const buildSection = (title, id, items) => {
                    const sec = document.createElement('div');
                    // start collapsed on mobile for smoother one-screen UX
                    sec.className = 'mb-10 session-wrap relative' + (isMobile ? ' mobile-collapsed' : '');
                    // assign an explicit id to the outer section so the mobile toggle targets the wrapper (fixes mobile toggles)
                    sec.id = `${id}-wrap`;
                    sec.innerHTML = `
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-lg font-display font-medium text-white">${title}</h2>
                            <!-- mobile toggle button -->
                            <button class="mobile-toggle-btn md:hidden" onclick="toggleSectionMobile('${id}-wrap')">
                                <i class="ph ph-caret-down text-white/60"></i>
                                <span class="text-white/70 text-sm">Abrir</span>
                            </button>
                        </div>
                        <div class="relative session-body">
                            <button class="session-arrow left" aria-label="${id}-left" onclick="scrollCards('${id}', -1)">
                                <i class="ph ph-caret-left text-2xl"></i>
                            </button>
                            <div id="${id}" class="session-scroll grid-auto-fit"></div>
                            <button class="session-arrow right" aria-label="${id}-right" onclick="scrollCards('${id}', 1)">
                                <i class="ph ph-caret-right text-2xl"></i>
                            </button>
                        </div>
                    `;
                    wrap.appendChild(sec);
                    render16by9CatalogCards(items, sec.querySelector(`#${id}`));
                };

                buildSection('Novidades', 'section-new-grid', novidades);
                buildSection('Comédias', 'section-comedy-grid', comedias);
                buildSection('Recomendados para você', 'section-reco-grid', recomendados);

                // append after the trends section if present, otherwise at end
                const trends = document.getElementById('section-trends');
                if(trends && trends.parentNode) trends.parentNode.insertBefore(wrap, trends.nextSibling);
                else container.appendChild(wrap);
            } catch(e) { /* fail silently */ }
        }

        // insert a small legal button and a "Surpreenda-me" pill at the end of Home and Search views (mobile-friendly & inside content)
        function insertLegalFooter() {
            try {
                const container = document.getElementById('main-content');
                if (!container) return;
                // remove any existing injected area to avoid duplicates
                const prev = document.getElementById('legal-footer-inserted');
                if (prev) prev.remove();

                // only show inside Home and Search
                if (state.tab !== 'home' && state.tab !== 'search') return;

                // Do NOT show the footer on mobile when viewing the Search tab
                if (state.tab === 'search' && window.innerWidth <= 767) return;

                // create a compact footer with two side-by-side pill buttons
                const wrapper = document.createElement('div');
                wrapper.id = 'legal-footer-inserted';
                wrapper.className = 'px-6 md:px-16 mt-6 mb-8 flex gap-3 items-center justify-center md:justify-start';

                // improved visual: left small hint and right action pills
                const leftInfo = document.createElement('div');
                leftInfo.className = 'hidden md:flex items-center gap-3 text-white/60 text-sm';
                leftInfo.innerHTML = `<i class="ph ph-gavel text-xl text-white/30"></i><span>Projeto de demonstração • Conteúdo de terceiros</span>`;

                const pills = document.createElement('div');
                pills.className = 'flex gap-3 flex-wrap';

                const legalBtn = document.createElement('button');
                legalBtn.className = 'glass px-4 py-2 rounded-full text-xs text-white/90 hover:text-white transition-colors flex items-center gap-2';
                legalBtn.innerHTML = `<i class="ph ph-file-text text-sm"></i><span>Aviso Legal</span>`;
                legalBtn.onclick = (e) => { e.stopPropagation(); openLegal2(); };

                const surpriseBtn = document.createElement('button');
                surpriseBtn.id = 'surprise-btn';
                surpriseBtn.className = 'bg-accent px-4 py-2 rounded-full text-xs font-semibold text-black hover:bg-accentHover transition-colors flex items-center gap-2';
                surpriseBtn.innerHTML = `<i class="ph ph-dice text-sm"></i><span>Surpreenda-me</span>`;
                surpriseBtn.onclick = (e) => { e.stopPropagation(); surpriseMe(); };

                pills.appendChild(surpriseBtn);
                pills.appendChild(legalBtn);

                wrapper.appendChild(leftInfo);
                wrapper.appendChild(pills);

                // append to container (end of content visible area)
                container.appendChild(wrapper);

                // small animation hint on first insert for discoverability
                requestAnimationFrame(() => {
                    try {
                        wrapper.style.opacity = '0';
                        wrapper.style.transform = 'translateY(6px)';
                        wrapper.style.transition = 'opacity 360ms ease, transform 360ms cubic-bezier(0.16,1,0.3,1)';
                        requestAnimationFrame(() => { wrapper.style.opacity = '1'; wrapper.style.transform = 'translateY(0)'; });
                        setTimeout(() => { wrapper.style.transition = ''; wrapper.style.opacity = ''; wrapper.style.transform = ''; }, 520);
                    } catch (e) {}
                });
            } catch (e) { /* silent */ }
        }

        // Surpreenda-me: pick a random item weighted by user's favorite genres/history and play it immediately.
        function surpriseMe() {
            try {
                // Build preferred genre set from favorites and history
                const favGenres = new Set();
                (state.favorites || []).forEach(fid => {
                    try {
                        const f = db.find(d => d.id === fid);
                        if (!f || !f.category) return;
                        f.category.split(/[,\/]| e | & /i).forEach(g => {
                            const ng = String(g || '').toLowerCase().trim();
                            if (ng) favGenres.add(ng);
                        });
                    } catch(_) {}
                });

                // also include genres from recently watched history items
                Object.keys(state.history || {}).forEach(seriesId => {
                    try {
                        const h = state.history[seriesId];
                        const s = db.find(d => d.id === seriesId);
                        if (!s || !s.category) return;
                        s.category.split(/[,\/]| e | & /i).forEach(g => {
                            const ng = String(g || '').toLowerCase().trim();
                            if (ng) favGenres.add(ng);
                        });
                    } catch(_) {}
                });

                // Build candidate pool: prefer items matching any preferred genre, fallback to whole DB
                let pool = [];
                if (favGenres.size > 0) {
                    const arr = Array.from(favGenres);
                    pool = db.filter(item => {
                        try {
                            const cat = (item.category || '').toLowerCase();
                            return arr.some(g => g && cat.includes(g));
                        } catch (e) { return false; }
                    });
                }
                if (!Array.isArray(pool) || pool.length === 0) {
                    // fallback: include recently viewed items and then everything
                    const recentIds = Object.keys(state.history || {}).sort((a,b) => {
                        const ta = (state.history[a] && state.history[a].timestamp) || 0;
                        const tb = (state.history[b] && state.history[b].timestamp) || 0;
                        return tb - ta;
                    });
                    pool = recentIds.map(id => db.find(d => d.id === id)).filter(Boolean);
                    if (pool.length < 6) pool = pool.concat(db.filter(i => !pool.includes(i))).slice(0, Math.max(8, db.length));
                }

                // choose a random item from pool (weighted slightly by matching tags / popularity)
                const scored = pool.map(item => {
                    let score = 1;
                    try { if (item.tags && item.tags.includes('Lançamento')) score += 2; } catch(_) {}
                    try { if (item.ratings && item.ratings.imdb) score += Math.min(3, Math.floor((item.ratings.imdb || 0) / 3)); } catch(_) {}
                    return { item, score };
                });
                const total = scored.reduce((s, x) => s + (x.score || 1), 0) || 1;
                let pick = Math.random() * total;
                let chosen = scored[0].item;
                for (const s of scored) {
                    pick -= s.score;
                    if (pick <= 0) { chosen = s.item; break; }
                }

                if (!chosen) {
                    showToast('Não foi possível encontrar algo agora. Tente novamente.', 2000);
                    return;
                }

                // If chosen is a film: play its url; if series: prefer user's last watched episode or first ep
                if (chosen.type === 'filme') {
                    if (!chosen.url) {
                        showToast('Desculpe, a mídia selecionada não está disponível.', 2000);
                        return;
                    }
                    // build context similar to openDetails/requestPlay expectations
                    const filmKey = chosen.id_ep || chosen.id;
                    const ctx = { type: 'filme', id: filmKey || ('url:' + encodeURIComponent(chosen.url)), url: chosen.url };
                    // ensure we're on home tab so player resources are available
                    switchTab('home', false);
                    setTimeout(() => requestPlay(chosen.url, chosen.title, ctx), 180);
                    return;
                } else if (chosen.type === 'serie') {
                    // determine season/episode: prefer history entry
                    const hist = state.history[chosen.id];
                    let s = hist ? hist.s : null;
                    let e = hist ? hist.e : null;
                    if (s == null) {
                        // pick first non-empty season
                        const seasons = Object.keys(chosen.seasons || {});
                        if (seasons.length) s = seasons[0];
                        else s = '1';
                        e = 0;
                    }
                    const seasonArr = chosen.seasons && chosen.seasons[s] ? chosen.seasons[s] : (chosen.seasons ? chosen.seasons[Object.keys(chosen.seasons)[0]] : []);
                    const ep = (seasonArr && seasonArr[e]) ? seasonArr[e] : (seasonArr && seasonArr[0]) ? seasonArr[0] : null;
                    if (!ep || !ep.url) {
                        // fallback: find any episode with a url
                        let found = null;
                        if (chosen.seasons) {
                            for (const ss of Object.keys(chosen.seasons)) {
                                const arr = chosen.seasons[ss] || [];
                                for (let ix=0; ix<arr.length; ix++) {
                                    if (arr[ix] && arr[ix].url) { found = { s: ss, e: ix, ep: arr[ix] }; break; }
                                }
                                if (found) break;
                            }
                        }
                        if (!found) {
                            showToast('Episódio não disponível para reprodução.', 2000);
                            return;
                        }
                        s = found.s; e = found.e; 
                        ep = found.ep;
                    }
                    const stableEpId = (ep && ep.id && String(ep.id).trim()) ? ep.id : `${chosen.id}-s${s}-e${e}`;
                    const ctx = { type: 'serie', seriesId: chosen.id, seriesTitle: chosen.title, season: s, episode: e, id: stableEpId, trigger: chosen.nextEpisodeTrigger || 0, url: ep.url, introStart: ep.introStart || 0, introDuration: ep.introDuration || 0 };
                    switchTab('home', false);
                    setTimeout(() => requestPlay(ep.url, `T${s}:E${Number(e)+1} - ${ep.title}`, ctx), 220);
                    return;
                } else {
                    showToast('Tipo de item desconhecido.', 1600);
                }
            } catch (e) {
                console.warn('surpriseMe failed', e);
                showToast('Erro ao escolher um item. Tente novamente.', 2000);
            }
        }

        // expose init on load (robust startup with graceful error handling and guaranteed listeners)
        (function robustInit() {
            // Lightweight startup: render UI but avoid starting periodic/expensive tasks until user interacts.
            const safeInit = () => {
                try {
                    // If an inline obfuscated DB was stored during parsing, decode it here before any render so links are available at runtime.
                    try {
                        if (window.__lumina_deobf && typeof window.__lumina_deobf.decodeDb === 'function') {
                            // prefer the in-memory copy created earlier (__db_store) or fallback to any existing window.db
                            const store = window.__db_store || window.db || null;
                            if (Array.isArray(store)) {
                                try { window.__lumina_deobf.decodeDb(store); } catch(_) {}
                                try { window.db = store; } catch(_) {}
                            } else {
                                try { window.db = window.db || []; } catch(_) {}
                            }
                        }
                    } catch (e) {
                        // non-blocking: continue even if decode fails
                        console.warn('DB decode at safeInit failed', e);
                    }

                    // Attach nav listeners immediately
                    try { attachNavTabListeners(); } catch (e) { console.warn('attachNavTabListeners failed', e); }

                    // Render UI and insert lightweight footer so page is interactive fast
                    try { renderView(); insertLegalFooter(); } catch (e) { console.warn('initial render failed', e); }

                    // Load DB and minimal init without starting rotators/badge timers
                    (async () => {
                        try {
                            await ensureDB();
                        } catch (_) {}
                        // Do not start heavy rotators until user engages — let init() finish light work
                        try { init(); } catch (e) { console.warn('init() caught', e); }
                    })();
                } catch (err) {
                    console.error('Lumina safeInit failed:', err);
                    try {
                        state.tab = state.tab || 'home';
                        renderView();
                        insertLegalFooter();
                    } catch (e2) { console.error('fallback render failed', e2); }
                }
            };

            // Start heavy background tasks only after a first real user gesture to avoid CPU spikes on load and prevent background timers from running on backgrounded tabs.
            const startDeferredBackgroundWork = () => {
                try {
                    // Run once and remove listeners
                    window.removeEventListener('pointerdown', startDeferredBackgroundWork);
                    window.removeEventListener('touchstart', startDeferredBackgroundWork);
                    window.removeEventListener('click', startDeferredBackgroundWork);

                    // Start rotators and badge timers gently
                    try { startHeroRotate(); } catch (_) {}
                    try { startHomeRotator(); } catch (_) {}
                    try { startBadgeTimer(); } catch (_) {}

                    // initialize notifications/badges that required user gesture
                    try { if (typeof initBadgesAndNotifications === 'function') initBadgesAndNotifications(); } catch (_) {}
                } catch (e) { console.warn('startDeferredBackgroundWork failed', e); }
            };

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', safeInit);
            } else {
                setTimeout(safeInit, 16);
            }

            // Defer starting periodic heavy tasks until user interacts; this reduces startup CPU and avoids background throttling issues.
            window.addEventListener('pointerdown', startDeferredBackgroundWork, { passive: true, once: true });
            window.addEventListener('touchstart', startDeferredBackgroundWork, { passive: true, once: true });
            window.addEventListener('click', startDeferredBackgroundWork, { passive: true, once: true });

            // Also protect against runtime errors that could break subsequent interactions
            window.addEventListener('error', (ev) => {
                console.error('Runtime error captured:', ev.error || ev.message, ev.filename + ':' + ev.lineno);
            }, { passive: true });

            window.addEventListener('unhandledrejection', (ev) => {
                console.warn('Unhandled promise rejection captured:', ev.reason);
            });
        })();

        // Ensure navigation buttons reliably call switchTab by attaching safe event listeners and focus mobile search when opening Search tab
        function attachNavTabListeners() {
            try {
                const mapping = {
                    'tab-home-desktop': 'home',
                    'tab-fav-desktop': 'favorites',
                    'tab-home-mobile': 'home',
                    'tab-search-mobile': 'search',
                    'tab-fav-mobile': 'favorites'
                };
                Object.keys(mapping).forEach(id => {
                    const el = document.getElementById(id);
                    if (!el) return;
                    // avoid adding duplicate listeners
                    if (!el.__lumina_nav_bound) {
                        el.addEventListener('click', (ev) => {
                            ev.preventDefault();
                            try { 
                                switchTab(mapping[id]); 
                                // if user opened the mobile Search tab, focus the mobile search input after render to improve discoverability
                                if (mapping[id] === 'search') {
                                    setTimeout(() => {
                                        try {
                                            const mInput = document.getElementById('mobile-search');
                                            if (mInput) {
                                                mInput.focus({ preventScroll: true });
                                                // ensure virtual keyboard shows on mobile by briefly selecting value
                                                try { mInput.setSelectionRange && mInput.setSelectionRange(mInput.value.length, mInput.value.length); } catch(_) {}
                                            }
                                        } catch(_) {}
                                    }, 260);
                                }
                            } catch (_) {}
                        }, { passive: true });
                        el.__lumina_nav_bound = true;
                    }
                });
            } catch (e) { /* silent */ }
        }
        // Attach once DOM is interactive to cover all render timing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', attachNavTabListeners);
        } else {
            setTimeout(attachNavTabListeners, 50);
        }

        // Ensure progress is flushed when the user navigates away or the page is hidden
        window.addEventListener('beforeunload', () => {
            try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch (_) {}
        }, { passive: true });

        // Also handle pagehide/visibilitychange to better capture mobile cases (background / tab switches)
        window.addEventListener('pagehide', () => {
            try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch (_) {}
        }, { passive: true });

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                try { if (window.player && typeof window.player.saveProgress === 'function') window.player.saveProgress(); } catch (_) {}
                try { flushProgressNow(); } catch(_) {}
            }
        }, { passive: true });

        // --- LEGAL / DISCLAIMER HANDLERS ---
        // Robust modal open/close that queries DOM at call time (avoids init-order failures)
        (function(){
            // helper to check reduced motion preference at runtime
            function prefersReducedMotion() {
                try { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e) { return false; }
            }

            // open legal modal (safe lookup each call)
            window.openLegal = function() {
                const modal = document.getElementById('legal-modal');
                if (!modal) return;
                const inner = modal.querySelector('[data-legal-card]');
                if (!inner) return;

                // reset classes/states
                modal.classList.remove('hidden', 'modal-closing');
                // Prepare starting styles for animation (reduced motion respected)
                if (!prefersReducedMotion()) {
                    inner.style.transition = '';
                    inner.style.transform = 'translateY(8px) scale(0.98)';
                    inner.style.opacity = '0';
                } else {
                    inner.style.transition = 'none';
                    inner.style.transform = 'none';
                    inner.style.opacity = '1';
                }

                // ensure overlay visibility after paint
                requestAnimationFrame(() => {
                    modal.classList.add('modal-open');
                    document.body.style.overflow = 'hidden';
                    // focus first actionable element for accessibility
                    const first = modal.querySelector('button, [href], input, select, textarea');
                    if (first) first.focus();
                });
            };

            // close legal modal with transitionend safety and fallback timeout
            window.closeLegal = function() {
                const modal = document.getElementById('legal-modal');
                if (!modal) return;
                const inner = modal.querySelector('[data-legal-card]');
                if (!inner) return;

                modal.classList.remove('modal-open');
                modal.classList.add('modal-closing');

                const cleanClose = () => {
                    modal.classList.add('hidden');
                    modal.classList.remove('modal-closing');
                    document.body.style.overflow = '';
                };

                // listen transitionend once if possible
                const onEnd = (e) => {
                    if (e && e.target !== inner) return;
                    inner.removeEventListener('transitionend', onEnd);
                    cleanClose();
                };

                if (!prefersReducedMotion()) {
                    inner.addEventListener('transitionend', onEnd);
                    // safety fallback
                    setTimeout(() => {
                        try { inner.removeEventListener('transitionend', onEnd); } catch(_) {}
                        cleanClose();
                    }, 520);
                } else {
                    cleanClose();
                }
            };

            // global Escape handler (queries modal state at runtime)
            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape') {
                    const modal = document.getElementById('legal-modal');
                    if (modal && !modal.classList.contains('hidden')) window.closeLegal();
                }
            });
        })();
