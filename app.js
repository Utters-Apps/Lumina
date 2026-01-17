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
        url: 'https://def1.pcloud.com/cfZvRd0rk7ZL3fQDP7ZKlNC7ZZdOcq0kZQ5ZZMFXZZST5SvZ7HZwQZwRZn0ZuzZrXZA8ZeJZBzZIFZ1mZTQZr4ZVFZpch6kTz25LVB2NTQABpcO7XfJMzX/53f2a0d97fd98ff3efef952370abc7665fc1f9895723538f5917f8b7ef2c4667.mp4'
    },
    {
        id: 'diario-banana-2',
        title: 'Diário de um Banana 2',
        type: 'filme',
        category: 'Comédia / Irmãos',
        year: '2011',
        cover: 'https://m.media-amazon.com/images/S/pv-target-images/12bd2a9871c75d6abfddb48638342629f8190b81c3784e15e468eb3c96d53e31._UR1920,1080_.jpg',
        description: 'De volta às aulas, Greg e seu irmão mais velho Rodrick lidam com suas tentativas hilárias e desajeitadas de se darem bem (ou não).',
        url: 'https://def4.pcloud.com/cfZs6K0rk7ZBYSQDP7ZKlNC7ZZQAcq0kZQ5ZZMFXZZ93MNy7ZlpZy9ZDRZrFZ7mZYpZOLZbmZgLZA4ZbHZiLZA0ZRZVglFfwLyoX5fxbwV6SnkczJHPMRX/b3c16646244d9ca0a9a3f6c2243af2de469c68d7195ada34d4ee66a6c5a1f4dd.mp4'
    },
    {
        id: 'diario-banana-3',
        title: 'Diário de um Banana 3',
        type: 'filme',
        category: 'Comédia / Verão',
        year: '2012',
        cover: 'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/019b2f32-b4d6-7163-9299-3e0e72111f11/compose?aspectRatio=1.78&format=webp&width=1200',
        description: 'As férias de verão chegaram e Greg quer passar o tempo jogando videogame, mas seu pai tem outros planos para ele.',
        url: 'https://def1.pcloud.com/cfZslSJrk7ZG25hDP7ZKlNC7ZZfhoq0kZQ5ZZMFXZZv745rZELZYmZYHZIFZqFZqmZx4Z4QZ18ZARZSRZo8ZHmZOzZAKSj5OnwNouoCLfYcGQyOHmtPpdy/5197274c04d77a609efabbede1b1b5d98b1aed377010aa8988f5b05df950a695.mp4'
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
            1: [ { title: "O desaparecimento de Will Byers", url: "https://def3.pcloud.com/cfZQMEf4wZgrqCDP7ZKUNC7ZZuU7t0kZQ5ZZMFXZZw0nMqZjXZORZUTZd8ZMmZa8ZUmZhYZiQZkQZ6TZ79ZBLZ3FZiHqPsYhWQ0VB31vnWTHKrHlgSc27/T01EP01.mp4" }, { title: "A estranha da Maple Street", url: "https://def4.pcloud.com/cfZCuv6dIZpQ6CDP7ZKUNC7ZZOA7t0kZQ5ZZMFXZZVaMcIZ2mZeYZvRZ8HZwYZYmZG4Z3TZRYZSYZkQZ9FZdYZKTZljIbYnNECv8TXTHWhPbgu7elDLBy/T01EP02.mp4" }, { title: "Caramba", url: "https://def3.pcloud.com/cfZJpr6dIZo3wCDP7ZKUNC7ZZeN7t0kZQ5ZZMFXZZUOnwEZAQZdTZv8ZmYZLYZP8ZMmZVRZYLZOpZeYZxmZ0mZaTZUFQu66Ciw4FnlXTd3jdKdHc2pbdk/T01EP03.mp4" }, { title: "O corpo", url: "https://def3.pcloud.com/cfZIYp8rk7ZzJKCDP7ZKUNC7ZZ5a7t0kZQ5ZZMFXZZ9iQh6Z8QZIVZy8ZjRZlLZipZrLZAYZEFZURZxYZrYZYmZzYZLq5eJGJhu3FkEfoBDrzRozx9imCy/T01EP04.mp4" }, { title: "A pulga e o acrobata", url: "https://def1.pcloud.com/cfZH9J8rk7ZbagCDP7ZKUNC7ZZAa7t0kZQ5ZZMFXZZQ5d6OZYLZMFZjLZaYZlzZR4ZfzZ2QZIQZapZFJZwHZTRZV4ZnRDVbYXCf34XgmKMGqjl1zbDOtb7/T01EP05.mp4" }, { title: "O monstro", url: "https://def3.pcloud.com/cfZMkJ8rk7ZPfTCDP7ZKUNC7ZZl37t0kZQ5ZZMFXZZG9D3lZY8ZWYZeJZl4Zr4Z6zZxHZUQZ5VZN8Z0RZIFZU4ZHLZnEnbKYAC6D8w3FH4PNooxRedY9yV/T01EP06.mp4" }, { title: "A banheira", url: "https://def4.pcloud.com/cfZVo08rk7ZVKnCDP7ZKUNC7ZZ0G7t0kZQ5ZZMFXZZFDvDCZspZYzZsYZLYZtpZr8Zx8ZSRZtYZHzZ3zZn7ZxLZBLZvo1yIxA5SOLIr93ONXCeyJgSq7nk/T01EP07.mp4" }, { title: "De ponta-cabeça", url: "https://def1.pcloud.com/cfZYNV8rk7Z8xDCDP7ZKUNC7ZZ2G7t0kZQ5ZZMFXZZ9VuuIZULZj4ZKFZyzZ5QZmLZSmZTQZVHZ3mZbYZtQZ1LZU8ZSnYq9l0GSiybUT0uOvGGwVzd5pCk/T01EP08.mp4" } ],
            2: [ { title: "Mad Max", url: "https://def1.pcloud.com/cfZWAPQrk7ZvWplDP7Z8INC7ZZqmkt0kZQ5ZZMFXZZlvcKoZnRZJLZU4Zn8ZB8ZwLZxpZaLZp4ZlQZF4Zm8ZmLZwHZF0KhCSp6wzmpBfTWPU9vGF4GRGak/T02EP01.mp4" }, { title: "Gostosura ou travessura", url: "https://def4.pcloud.com/cfZOTU8rk7Z9ebwDP7ZKUNC7ZZtkkt0kZQ5ZZMFXZZGddCp7ZNYZLmZ9RZAQZvRZFHZcRZPXZ98ZlFZaFZeLZfLZc7ZKCTFzNTra2fcVWazf3RQX5ve2nRX/T02EP02.mp4" }, { title: "O girino", url: "https://def4.pcloud.com/cfZpMI8rk7ZJyjwDP7ZKUNC7ZZ0Vkt0kZQ5ZZMFXZZesw4X7ZtYZc7ZBLZ9LZuzZJRZpLZ74ZbHZl4ZTzZWzZLJZYYZRg24TAeQDmjLeELLRQ4FkYrvS9P7/T02EP03.mp4" }, { title: "Will, o sábio", url: "https://def2.pcloud.com/cfZ9G68rk7ZHnLwDP7ZKUNC7ZZL0kt0kZQ5ZZMFXZZCyPSrZ2JZyYZOzZoHZd4ZeFZRzZ9YZqYZOFZbYZxHZQQZ9mZqD1S3oWcOAVai05G4pO02Y9LQeCk/T02EP04.mp4" }, { title: "Dig Dug", url: "https://def4.pcloud.com/cfZw368rk7ZySLwDP7ZKUNC7ZZN0kt0kZQ5ZZMFXZZLpcQR7ZUQZjRZg8ZzFZIFZwLZJZTzZbQZn4ZaRZERZlmZWzZ4aAsJ6jNjljYaOONEn0NupeViwEk/T02EP05.mp4" }, { title: "O espião", url: "https://def1.pcloud.com/cfZzxqQrk7ZWgelDP7Z8INC7ZZGbkt0kZQ5ZZMFXZZemxSV7ZFJZxYZvFZN7Zp8ZOQZl8ZNLZK4Z6YZLmZ3zZnLZRmZ9zLAeUolTSFTlhr5blVYFhd7yrrX/T02EP06.mp4" }, { title: "A irmã perdida", url: "https://def1.pcloud.com/cfZYCKQrk7ZrThlDP7Z8INC7ZZfhkt0kZQ5ZZMFXZZnLYsiZMmZ4RZPzZRQZ0RZDLZ5pZJZ0zZNRZN4ZPXZNLZO8ZP53t1mNG2C5yxULM3lMo6pTonRC7/T02EP07.mp4" }, { title: "O Devorador de Mentes", url: "https://def2.pcloud.com/cfZs0KQrk7ZDlmlDP7Z8INC7ZZUhkt0kZQ5ZZMFXZZMxbQoZaRZAQZXHZHpZKpZaYZRQZBmZrFZWQZrLZy9ZbLZwmZnEQAr6KAlj7IrSk6GxNvtbWfvnay/T02EP08.mp4" }, { title: "O portal", url: "https://def3.pcloud.com/cfZMiCQrk7Zt6zlDP7Z8INC7ZZlSkt0kZQ5ZZMFXZZYvzsY7ZbQZqpZ04ZHzZA4ZwRZe4Z1HZHpZH4Z6zZiLZzRZVFZgSuQeODK27uxIOfc7hO23HdJQ6ay/T02EP09.mp4" } ],
            3: [ { title: "Está me ouvindo, Suzie?", url: "https://def1.pcloud.com/cfZFaGYrk7ZlKHtDP7ZAINC7ZZsqkt0kZQ5ZZMFXZZnvOV07ZtLZn8ZsRZ4LZN0Zk4ZORZFYZK4ZFmZy8ZlQZgQZWYZy00oW13kBUzEdNyac4XVjpwF6FOX/T03EP01.mp4" }, { title: "O caso dos ratos", url: "https://def1.pcloud.com/cfZrfvYrk7Z0xztDP7ZAINC7ZZNqkt0kZQ5ZZMFXZZ7I3eV7ZTJZYmZUzZYRZ1YZ14ZL8ZWXZT8ZDHZO8ZLzZTmZd7ZWKy1LvjSHUpEux5KjilUJysC0dq7/T03EP02.mp4" }, { title: "A salva-vidas desaparecida", url: "https://def1.pcloud.com/cfZzXNYrk7ZfyXtDP7ZAINC7ZZRtkt0kZQ5ZZMFXZZXMg507ZDJZyYZHzZKYZvHZCRZSRZMmZvpZrFZNzZBmZKpZfLZdKv6ArzuYFVqCSnfoVmwvFyuwBq7/T03EP03.mp4" }, { title: "A prova da sauna", url: "https://def3.pcloud.com/cfZh0aYrk7ZzH0tDP7ZAINC7ZZGtkt0kZQ5ZZMFXZZe1UFp7ZqLZApZizZbQZyYZRzZsYZXzZwzZSmZTHZfQZbRZgLZVcuGXAHJLgSuSQHW0zGcUQG1MVtk/T03EP04.mp4" }, { title: "Os devorados", url: "https://def3.pcloud.com/cfZ1l4Yrk7ZAmqdDP7Z8INC7ZZw9kt0kZQ5ZZMFXZZf8SHF7Z0QZXRZYHZW4ZHzZ3RZGLZVHZfHZoRZr4Z1zZNVZ4YZxfQqf4hRHSpdggXfH87FXuiw4gSX/T03EP05.mp4" }, { title: "E pluribus unum", url: "https://def3.pcloud.com/cfZHxRYrk7ZNQxdDP7Z8INC7ZZH9kt0kZQ5ZZMFXZZt1GtY7Z1YZ04ZdLZgmZe8Z5pZPRZJYZKYZiLZd8ZVmZIQZ8XZsbG9kPexr5XlN7nTk0G7e8AKyeq7/T03EP06.mp4" }, { title: "A mordida", url: "https://def1.pcloud.com/cfZBEJYrk7ZHFsdDP7Z8INC7ZZdnkt0kZQ5ZZMFXZZH87Iz7ZUzZq4ZN4Z88ZhzZtzZMQZRRZxHZsLZamZnmZ5pZyLZcJ72eUqxYDQPjNtquuKILVcpHQly/T03EP07.mp4" }, { title: "A batalha de Starcourt", url: "https://def3.pcloud.com/cfZ6pRYrk7Z7YCdDP7Z8INC7ZZoekt0kZQ5ZZMFXZZktXDd7Zr0ZrQZvFZpHZjzZERZ6pZg4ZJLZw8Z98ZwYZA8ZGLZRYRRXh6ewDfHuW5xKEhRyuehbCi7/T03EP08.mp4" } ],
            4: [ { title: "O Clube Hellfire", url: "https://def3.pcloud.com/cfZXmBbrk7ZnflODP7Z9ANC7ZZaLXt0kZQ5ZZMFXZZpXdhs7ZtQZNmZ3mZl4ZTJZ14ZX4ZwHZ8HZlLZcHZLzZd8ZmYZLfAyOAfMwo7eKI0NcMwl9FpeQmiV/T04EP01.mp4" }, { title: "A maldição de Vecna", url: "https://def1.pcloud.com/cfZyYjbrk7Z3DMODP7Z9ANC7ZZe4Xt0kZQ5ZZMFXZZtXs8u7Zv0ZNRZbmZ2YZmYZgYZrFZm4Z8QZhzZv8ZOFZkmZkJZbnO02GYbcqmnydeFlDOjjVsMw5oV/T04EP02.mp4" }, { title: "O monstro e a super-heroína", url: "https://def1.pcloud.com/cfZOfBbrk7ZbllODP7Z9ANC7ZZk8Xt0kZQ5ZZMFXZZR7xK77ZgzZBLZqQZX8ZmHZ5RZYQZbmZ84ZvpZVFZDYZ04Z0HZtWb47x2b9LVhx8AeKdPnjYOmeER7/T04EP03.mp4" }, { title: "Querido Billy", url: "https://def2.pcloud.com/cfZ6gSbrk7ZzAnODP7Z9ANC7ZZK8Xt0kZQ5ZZMFXZZ60F8S7ZLJZIYZ0HZc7ZDLZeYZbRZ4HZqFZQzZUQZnLZrQZTHZ4tEJlMdEWkpwHH452xqLO4u1jldX/T04EP04.mp4" }, { title: "Projeto Nina", url: "https://def2.pcloud.com/cfZ2vmbrk7ZDF2ODP7Z9ANC7ZZYRXt0kZQ5ZZMFXZZvO2DQ7Z5mZwmZ2YZizZRZgpZoYZSYZzLZwzZF4ZCRZ18ZLQZ2P67xf9DBuHF1DX6nfg5JVXjGg4k/T04EP05.mp4" }, { title: "Mergulho", url: "https://def1.pcloud.com/cfZbn1mrk7Z78D6DP7ZAINC7ZZIokt0kZQ5ZZMFXZZ60XzR7ZqJZbQZr4ZwkZRQZGHZpmZ7YZDzZUFZXzZm4ZQzZa4ZlAkYDwDCKcmfYF3xaafAtQiC6JXV/T04EP06.mp4" }, { title: "O massacre no laboratório", url: "https://def4.pcloud.com/cfZYOWmrk7Zb7u6DP7ZAINC7ZZSokt0kZQ5ZZMFXZZnI7qd7ZAzZtzZbQZImZALZQLZG4Z7zZumZo4Zs8Zw8Z9RZ7RZvU72nx3vpsb3UqMFs4LYYpwvjG4V/T04EP07.mp4" }, { title: "Papai", url: "https://def4.pcloud.com/cfZBjumrk7ZXzL6DP7ZAINC7ZZpckt0kZQ5ZZMFXZZ4VjYx7ZUFZqFZc7ZtzZHzZ2pZPzZsQZ3QZKmZgpZl7ZgmZmFZFdBAUgzLBULqB2PxbkVH20zoc5rk/T04EP08.mp4" }, { title: "E o plano de Onze", url: "https://def1.pcloud.com/cfZi6Bmrk7ZJlm6DP7ZAINC7ZZMrkt0kZQ5ZZMFXZZzJurgkZpLZFYZNzZdYZlRZk4Z6pZ14ZYmZ0zZhRZhYZCHZFQZFu03Xo4lAtLNhMYkSyw2XFp3zMOk/T04EP09.mp4" } ],
            5: [ { title: "Missão de resgate", url: "https://def1.pcloud.com/cfZ8A9hrk7ZnkzADP7Z0NNC7ZZCPXt0kZQ5ZZMFXZZLXTGL7ZMLZeRZC4ZwkZbRZrQZm8Z0YZUQZVLZnmZN4ZjYZNVZQVByBFVfCoRQc81lt6wGhRQVrMtV/ep1.mp4" }, { title: "O desaparecimento de Holly Wheeler", url: "https://def1.pcloud.com/cfZRK3brk7Z0UAUDP7Z9ANC7ZZvBXt0kZQ5ZZMFXZZxETlIZTzZJLZOFZRzZILZkLZY8ZURZ04ZWQZYmZ0RZRYZiFZ8rxkblwsm4Q3qRCVAJy40SlG8gUV/ep2.mp4" }, { title: "A armadilha", url: "https://def1.pcloud.com/cfZqSNbrk7Z6gEUDP7Z9ANC7ZZQBXt0kZQ5ZZMFXZZMh8gV7Zq4Z0FZFmZK7ZT8ZDJZwRZTVZy4ZwQZsQZG4Z0RZg4ZfgJPXQsl5L4a0Us237VzBbvcEwVk/ep3.mp4" }, { title: "Feiticeiro", url: "https://def3.pcloud.com/cfZNkGbrk7ZfeNUDP7Z9ANC7ZZOfXt0kZQ5ZZMFXZZBtDSl7Z34ZY0ZwzZApZ0QZf4ZjYZ04ZIVZNQZg4ZvmZ44Z9pZoqK2x5yFTsVEnGCNF6Du9hf0Ne7y/ep4.mp4" }, { title: "Tratamento de choque", url: "https://def1.pcloud.com/cfZQ4ghrk7ZB0QADP7Z0NNC7ZZ4CXt0kZQ5ZZMFXZZmvJkTZjmZnLZr8ZO8ZNLZQHZqFZcpZcRZN4ZxYZy4ZuQZpYZ8rMKPGKupdLo0cDAIQocbQrLjzH7/05.%20Tratamento%20de%20choque_.mp4"}, { title: "A fuga de Camazotz", url: "https://def2.pcloud.com/cfZnmPhrk7ZzQmADP7Z0NNC7ZZaCXt0kZQ5ZZMFXZZIlYjB7ZAYZFHZP8ZSYZA8ZgzZkLZI4ZJmZLYZhRZJRZfLZj4ZPKC8R084WHYlN6do1BSGv5lNHzKk/06.%20A%20fuga%20de%20Camazotz.mp4" }, { title: "A ponte", url: "https://def1.pcloud.com/cfZJC9hrk7ZS9HADP7Z0NNC7ZZfxXt0kZQ5ZZMFXZZV993eZ3QZwHZURZfzZAzZlRZ18ZPLZbmZTQZLYZDYZIYZ5RZxMNzpn9b0o0fgFLibMqfKhCzl24k/07.%20A%20ponte.mp4" }, { title: "O mundo direito", url: "https://def4.pcloud.com/cfZOnnhrk7ZdhFADP7Z0NNC7ZZNxXt0kZQ5ZZMFXZZxH3Uy7ZC4ZzLZrXZa4ZA8ZCHZtpZr4ZkLZRzZFpZW8ZNYZpQZWxamFaXPtN0f6nhRutcJ1VrADvcV/08.%20O%20mundo%20_direito_.mp4" } ]
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
        url: 'https://def4.pcloud.com/cfZbQFSrk7ZqMSNDP7Z0NNC7ZZ63Xt0kZQ5ZZMFXZZrmfdRXZFHZlHZeFZtYZYHZk4ZjRZv5ZELZcRZlpZD7ZqmZAYZG1okJwXfDqRGsNkmoMqisbqcIXXy/Divertida%20Mente%202%20%5B1080p%5D%5BDual%5D.mp4'
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
                { title: "Encontro", url: "https://def2.pcloud.com/cfZt6yRrk7ZdjheDP7ZKlNC7ZZYtyt0kZQ5ZZMFXZZQkXEQZ7YZ94ZVzZ8LZVmZgpZHHZ4mZApZqFZwLZeQZDHZv8ZsIlUm0QxMVHzaQJVJQNo2jIUAAX7/Episódio.01.mp4" },
                { title: "Crush", url: "https://def4.pcloud.com/cfZF8yRrk7ZU1beDP7ZKlNC7ZZttyt0kZQ5ZZMFXZZbGgKhZ5RZcpZd4ZNQZmmZOFZlzZn7Z8pZbHZiHZkQZ2XZqHZFV45UARHo1zUEbBsaUSwkRibxOuX/Episódio.02.mp4" },
                { title: "Beijo", url: "https://def4.pcloud.com/cfZh4ozrk7ZOWYeDP7ZKlNC7ZZ76yt0kZQ5ZZMFXZZsFtYmZQzZkpZaRZUQZOpZFQZgLZHFZ9RZA4ZOHZXzZeHZs8ZtC56LRlC6LYw6HuKYp2uFRdJPEYX/Episódio.03.mp4" },
                { title: "Segredo", url: "https://def4.pcloud.com/cfZR5yRrk7ZYLbeDP7ZKlNC7ZZs6yt0kZQ5ZZMFXZZT2FWjZDHZpmZQLZqFZILZm4ZvpZTmZeRZXQZl7ZA4Z5pZ2QZ1W6aHoYIIykkeaSLuIM8bLGXow8V/Episódio.04.mp4" },
                { title: "Amizade", url: "https://def2.pcloud.com/cfZ8e8Rrk7Zfm3eDP7ZKlNC7ZZxUyt0kZQ5ZZMFXZZOLNxmZ4QZ3QZwQZnYZa8ZrQZM4ZmRZOzZn7ZQHZG4ZTQZTJZHz3x92E4DvXHoT5KiIHL65zrJjiV/Episódio.05.mp4" },
                { title: "Garotas", url: "https://def3.pcloud.com/cfZ2o4Rrk7ZMiNeDP7ZKlNC7ZZ5Iyt0kZQ5ZZMFXZZ2evibZImZHRZIHZrFZH4ZqpZ79ZUQZeHZamZA4Zo8ZNVZSYZvHxTorrERrSgvRC2WQOGcfDIM9sy/Episódio.06.mp4" },
                { title: "Bullying", url: "https://def1.pcloud.com/cfZPS4Rrk7ZyxAeDP7ZKlNC7ZZxIyt0kZQ5ZZMFXZZDr6eQZ9mZORZ74ZbmZPHZbYZeLZH4ZdzZJLZo4ZGLZfQZ8QZBf375SekFd44BwV45hlRV7loTOby/Episódio.07.mp4" },
                { title: "Namoro", url: "https://def2.pcloud.com/cfZE58Rrk7Z5YaeDP7ZKlNC7ZZiIyt0kZQ5ZZMFXZZ3axysZT8Zf8ZFQZ4LZNYZNFZzpZSQZeYZK4ZezZUQZoRZJRZKE8vjnmXPhuDfuxrlDpXbVvNX357/Episódio.08.mp4" }
            ],
            2: [
                { title: "Revelação", url: "https://def3.pcloud.com/cfZ5TbLrk7ZvXSMDP7ZW6NC7ZZ6H7t0kZQ5ZZMFXZZUX81xZrRZCYZ1HZ7zZVHZ24ZW8Z3zZOLZxHZ79ZfQZIYZ34ZemsLcvOehyQScTtfwFUiPS3X86ey/Episódio.01%20%281%29.mp4" },
                { title: "Família", url: "https://def4.pcloud.com/cfZbfbLrk7ZOPhMDP7ZW6NC7ZZFz7t0kZQ5ZZMFXZZFJ1ftZlLZnzZeJZAYZ3mZlkZFHZf4ZtQZNRZm8ZBmZrzZOmZ9hC4YxOG3t7WzAQtzkxbS8a1AXNy/Episódio.02%20%281%29.mp4" },
                { title: "Promessa", url: "https://def4.pcloud.com/cfZN5mLrk7ZARYMDP7ZW6NC7ZZFR7t0kZQ5ZZMFXZZa5mUwZGQZPHZC4ZlzZUHZF4Z8HZ7LZbRZWRZTJZwRZvpZ4LZ1BXb8aQTzWY9KDt83JB9W4UjJ6c7/Episódio.03%20%281%29.mp4" },
                { title: "Desafio", url: "https://def4.pcloud.com/cfZ90YLrk7ZBU4MDP7ZW6NC7ZZyL7t0kZQ5ZZMFXZZFR1OUZNFZ18ZUpZxLZXHZkmZtmZ9FZ78Zx8ZDLZ04ZxHZKpZyEGXXGrA5rmIABPuCHItVfPmGGkX/Episódio.04%20%281%29.mp4" },
                { title: "Calor", url: "https://def2.pcloud.com/cfZkQ8Lrk7ZXJHMDP7ZW6NC7ZZhL7t0kZQ5ZZMFXZZfJTs3ZvmZnHZJYZfkZlYZfzZcpZeFZtpZ44ZRmZVQZ28ZzQZNQ0qAg6WlbjpbGRvMXiQaFYUYTlV/Episódio.05%20%281%29.mp4" },
                { title: "Verdade ou consequência", url: "https://def4.pcloud.com/cfZNfQLrk7ZCrRMDP7ZW6NC7ZZUL7t0kZQ5ZZMFXZZ7j19GZMpZQpZvHZamZdzZB8ZY8ZvpZpmZG7ZPRZnHZ70ZPHZLc4xsjhHJw7bSVAlzC2FKuFz3rX7/Episódio.06%20%281%29.mp4" },
                { title: "Desculpas e arrependimentos", url: "https://def2.pcloud.com/cfZIaxRrk7ZVoInDP7ZKlNC7ZZ0cyt0kZQ5ZZMFXZZa1nuwZ8pZOFZJRZHFZeHZWmZP8ZdLZUQZ9QZ1mZDLZvFZ3mZy7fUJlkG4NQxIhfo98IVpRcMzKwy/Episódio.07%20%281%29.mp4" },
                { title: "Perfeito", url: "https://def2.pcloud.com/cfZRAxRrk7ZJGInDP7ZKlNC7ZZUcyt0kZQ5ZZMFXZZrQNky7ZvmZT8Zc4ZkpZALZPLZazZApZ1pZYLZeHZwQZNRZWXZ8QjYI0r5LcunI0YLDgRYjF6syIQX/Episódio.08%20%281%29.mp4" }
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
        url: 'https://def2.pcloud.com/cfZOSsj11Z8LcTDP7ZW6NC7ZZQs7t0kZQ5ZZMFXZZLVSKnkZoYZdTZSQZi4ZGQZ0mZu4ZxQZ2QZT4ZMmZoRZOQZUTZrgMOLsmpRE7yBReTmeo2MbILa9ay/Luca.2021.1080p.WEB-DL.DUAL.5.1.COMANDO.TO.mp4'
    },
    {
        id: 'soul',
        title: 'Soul',
        type: 'filme',
        category: 'Animação / Drama',
        year: '2020',
        cover: 'https://businessisjammin.ca/wp-content/uploads/2021/02/soul-poster-fi-e1573147724188.jpg',
        description: 'Joe Gardner é um professor de música que recebe a chance de tocar no melhor clube de jazz da cidade, mas um pequeno passo em falso o leva das ruas de Nova York para o Pré-Vida.',
        url: 'https://def4.pcloud.com/cfZU0YhxWZVV8aDP7Z0NNC7ZZLvXt0kZQ5ZZMFXZZR5SwG5ZqTZFLZxmZ0QZITZD8ZwRZX4ZAYZG4ZcYZjLZAmZozZqJMdlLYPxub9YkcjK5BzfRvsL9p7/%28AnimesTotais%29%20Soul.2020.1080p.WEB-DL.x264-DUAL.mp4'
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
                { title: "O Que Terá Acontecido a Maddie Nears?", url: "https://www.dropbox.com/scl/fi/erfoa38zyjkll3z252pox/SSPRTS_2_1.mp4?rlkey=96tmhe507k8tsqueakqd6b9oo&raw=1" },
                { title: "Campo dos Gritos", url: "https://www.dropbox.com/scl/fi/g50i68mjnp63fky9ww2lq/SSPRTS_2_2.mp4?rlkey=6gy3g6laqgwa3qw6s4un9c5qp&raw=1" },
                { title: "Mal Posso Assombrar", url: "https://www.dropbox.com/scl/fi/8gcuxbsr0cmm3u8oqmp5r/SSPRTS_2_3.mp4?rlkey=tlsg1vc089sr3oq5d0rk1z9tt&raw=1" },
                { title: "Uma Troca de Corpos Para Recordar", url: "https://www.dropbox.com/scl/fi/cka8c8cjwq77a7cyir9h2/SPRTSNSCL_2_4.mp4?rlkey=to8417he1echsb0yyakq4msrb&raw=1" },
                { title: "Adivinhe Quem Vem Para Assombrar", url: "https://www.dropbox.com/scl/fi/bo40mxke2dd0ua5j6i2mz/ESPRTSNESCL_2_5.mp4?rlkey=jn1opprduik1yycb33y8hqf78&raw=1" },
                { title: "Assombração em Conflito", url: "https://www.dropbox.com/scl/fi/4ad5lshp9nayiyvpd43h1/SCHLSPRTS_2_6.mp4?rlkey=cilch3l3un75nw0cgg0qyl6t2&raw=1" },
                { title: "Anatomia de um Abrigo Nuclear", url: "https://www.dropbox.com/scl/fi/pwu7ta12jqnw9atmzgzha/SCHLSPRTS_2_7.mp4?rlkey=9mpeejrebfa90uayg1wzf7gwn&raw=1" },
                { title: "Fogo, Fale Comigo", url: "https://www.dropbox.com/scl/fi/8slbpn2laeflspv59k6i4/SCHLSPRT_2_8.mp4?rlkey=m2f8kzp3crv1q07374qpay2gi&raw=1" }
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
        url: 'https://def4.pcloud.com/cfZVAl7rk7ZFfVFDP7ZKlNC7ZZb2rq0kZQ5ZZMFXZZjObzvZ88Zj4ZgmZ3YZELZTzZAQZF4ZwQZ1HZ7mZkHZQQZUHZ2OfYt4sD8suYcCwXRQH9Df99WOQy/cc232c0973606f2e33859affe682c2edbdb417ca825ae83e1acbd47067b053b4.mp4'
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
        url: 'https://def4.pcloud.com/cfZK9y4rk7Z5oiTDP7ZW6NC7ZZIu7t0kZQ5ZZMFXZZvdr1kkZU8ZFHZRRZDHZfQZpmZvpZT8ZbHZK4Z6QZwHZWLZbmZdntDq2TrTA5rDcwlMazz5kDbUDM7/demon%20slayer_%20castelo%20infinito%20dublado%20%28camrip%29%20-%20%40drivesintelectuais.mp4'
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
        url: '//assistir.biz/iframe/el-camino?player=1'
    },
    {
        id: 'scream-1996',
        title: 'Pânico',
        originalTitle: 'Scream (1996)',
        type: 'filme',
        category: 'Terror / Suspense',
        year: '1996',
        ageRating: '14 anos',
        cover: 'https://occ-0-8407-90.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABccXgqXjgC0o-ud2hGqkysjV8V0ij3sXQxmmqZ99kxjKx94xoigeHgXolIeIiFQCgolwKcektQP-D30bVrHAl3q2PVwLOleXyUwf.jpg?r=f12',
        description: 'Em uma pacata cidade da Califórnia, um assassino mascarado fanático por filmes de terror assombra estudantes com telefonemas e violência brutal.',
        ratings: { imdb: 7.4, rottenTomatoes: 77 },
        url: 'https://drive.google.com/file/d/1LOZ7dLBCqW5aGdd-ZeqnPD9oQlXfCjUC/view?usp=drive_link'
    },
    {
        id: 'scream-2-1997',
        title: 'Pânico 2',
        originalTitle: 'Scream 2 (1997)',
        type: 'filme',
        category: 'Terror / Suspense',
        year: '1997',
        ageRating: '14 anos',
        cover: 'https://static.ndmais.com.br/2022/01/panico-2.jpg',
        description: 'Dois anos após os assassinatos em Woodsboro, Sidney e seus aliados enfrentam um novo Ghostface numa universidade enquanto tentam reconstruir suas vidas.',
        ratings: { imdb: 6.3, rottenTomatoes: 82 },
        url: 'https://drive.google.com/file/d/1yEGI2yX8nwZI9K6qyTvwtMvcNWVVAMhQ/view?usp=drive_link'
    },
    {
        id: 'scream-3-2000',
        title: 'Pânico 3',
        originalTitle: 'Scream 3 (2000)',
        type: 'filme',
        category: 'Terror / Suspense',
        year: '2000',
        ageRating: '14/16 anos',
        cover: 'https://cinepop.com.br/wp-content/uploads/2020/05/p%C3%A2nico-3-1.png',
        description: 'Sidney é atraída para Hollywood quando um novo Ghostface começa a matar o elenco de um filme baseado nos assassinatos de Woodsboro.',
        ratings: { imdb: 5.6, rottenTomatoes: 44 },
        url: 'https://drive.google.com/file/d/1lWid2HnPNskekGH5RnRrQNkQGQNm4g40/view?usp=drive_link'
    },
    {
        id: 'scream-4-2011',
        title: 'Pânico 4',
        originalTitle: 'Scream 4 (2011)',
        type: 'filme',
        category: 'Terror / Suspense',
        year: '2011',
        ageRating: '14 anos',
        cover: 'https://cinepop.com.br/wp-content/uploads/2021/04/scream4-cinepop1.jpg',
        description: 'Quinze anos depois, Sidney retorna a Woodsboro e, ao promover seu livro, enfrenta um novo assassino Ghostface que mira jovens fãs dos antigos crimes.',
        ratings: { imdb: 6.2, rottenTomatoes: 61 },
        url: 'https://drive.google.com/file/d/1OMVakVXur6eW4l_azw3wK2FzaBIx1bxd/view?usp=drive_link'
    },
    {
        id: 'scream-5-2022',
        title: 'Pânico (2022)',
        originalTitle: 'Scream (2022)',
        type: 'filme',
        category: 'Terror / Suspense',
        year: '2022',
        ageRating: '16 anos',
        cover: 'https://tm.ibxk.com.br/2022/01/13/13093300424066.jpg',
        description: 'Vinte e cinco anos após os crimes originais, um novo Ghostface persegue um grupo de adolescentes em Woodsboro, reacesando segredos do passado mortal da cidade.',
        ratings: { imdb: 6.3, rottenTomatoes: 76 },
        url: 'https://def1.pcloud.com/cfZ6rfzrk7ZkBNDDP7ZKlNC7ZZzPyt0kZQ5ZZMFXZZIazPVkZiFZIFZLzZvpZQLZwHZ7QZRZB8ZJLZ14ZjLZ30ZSmZbmWS2P7vepBwub4iplIRiuR9Wn0y/Panico.mp4'
    },
    {
        id: 'scream-6-2023',
        title: 'Pânico 6',
        originalTitle: 'Scream VI (2023)',
        type: 'filme',
        category: 'Terror / Suspense',
        year: '2023',
        ageRating: '18 anos',
        cover: 'https://s2-techtudo.glbimg.com/hhNztmkaLms4ZRgVaaFqGgIwzpQ=/0x0:1440x750/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/C/I/XXlufbQK6zXbAijdbRNw/scream-6.webp',
        description: 'Os sobreviventes deixam Woodsboro e recomeçam em Nova York, mas um novo e mais brutal Ghostface os persegue pela metrópole.',
        ratings: { imdb: 7.6, rottenTomatoes: 77 },
        url: 'https://drive.google.com/file/d/1gWY53IfGAnNsIi4p8yvqyHcZGVPrlSVD/view?usp=drive_link'
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

    // Mobile double-tap anywhere to reveal the top player overlay (REPRODUZINDO + Voltar)
    // Implementation: lightweight two-tap detector that toggles the overlay for a short duration.
    try {
        let lastTap = 0;
        const DOUBLE_TAP_MAX = 320; // ms
        const OVERLAY_SHOW_MS = 3000; // how long overlay stays visible after double-tap
        let overlayHideTimer = null;

        function showTopOverlayTemporarily() {
            const topOverlay = document.querySelector('.player-overlay');
            if (!topOverlay) return;
            // Only on mobile narrow viewports
            const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
            if (!isMobile) return;

            // make overlay visible and ensure interactive elements accept pointer-events
            try {
                topOverlay.style.display = 'flex';
                topOverlay.style.pointerEvents = 'auto';
                topOverlay.style.opacity = '1';
            } catch (e) {}

            // clear previous timer
            if (overlayHideTimer) clearTimeout(overlayHideTimer);
            overlayHideTimer = setTimeout(() => {
                try {
                    // hide overlay but leave pointer-events none to keep iframe clickable
                    topOverlay.style.opacity = '0';
                    topOverlay.style.pointerEvents = 'none';
                    // keep display:flex to avoid reflow jank; optionally hide entirely
                    topOverlay.style.display = 'flex';
                } catch (e) {}
            }, OVERLAY_SHOW_MS);
        }

        // Helper: reveal when user taps near the top edge (single tap)
        const TOP_TAP_THRESHOLD_PX = 120; // region from top that counts as "top tap"
        function handleTopTap(ev) {
            try {
                const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
                if (!isMobile) return;
                const touch = (ev.changedTouches && ev.changedTouches[0]) || ev;
                if (!touch) return;
                const y = touch.clientY;
                if (typeof y !== 'number') return;
                if (y <= TOP_TAP_THRESHOLD_PX) {
                    // show overlay when tapping near top
                    showTopOverlayTemporarily();
                }
            } catch (e) {}
        }

        // Attach a global touchend listener for lightweight double-tap detection on mobile
        window.addEventListener('touchend', (ev) => {
            try {
                const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
                if (!isMobile) return;
                const now = Date.now();
                if (now - lastTap <= DOUBLE_TAP_MAX) {
                    // double-tap detected
                    showTopOverlayTemporarily();
                    lastTap = 0;
                } else {
                    lastTap = now;
                    // also treat a single tap near the top as an intent to reveal overlay
                    handleTopTap(ev);
                }
            } catch (e) {}
        }, { passive: true });

        // Also support single 'click' fallback (some devices fire click instead of touchend)
        window.addEventListener('click', (ev) => {
            try {
                // Only check clicks when overlay is likely present (player open) to avoid unintended reveals
                const playerOverlayEl = document.getElementById('page-player');
                if (!playerOverlayEl || playerOverlayEl.classList.contains('hidden')) return;
                // Use clientY from MouseEvent
                const y = ev.clientY;
                if (typeof y === 'number' && y <= TOP_TAP_THRESHOLD_PX && window.innerWidth <= 520) {
                    showTopOverlayTemporarily();
                }
            } catch (e) {}
        }, { passive: true });
    } catch (e) {
        console.warn('Double-tap overlay init failed', e);
    }

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

                // attempt to read saved position from history for this id
                const hist = (state.history || []).find(h => h.id === id);
                const pos = hist && typeof hist.position === 'number' ? Number(hist.position) : 0;

                if (item.type === 'serie') {
                    playMedia(id, season, epIndex, pos);
                } else {
                    playMedia(id, '', 0, pos);
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
                    // decide play for series or movie and pass saved position
                    const item = contentDB.find(i => i.id === id);
                    const hist = (state.history || []).find(h => h.id === id);
                    const pos = hist && typeof hist.position === 'number' ? Number(hist.position) : 0;
                    if (!item) return;
                    if (item.type === 'serie') {
                        playMedia(id, season, epIndex, pos);
                    } else {
                        playMedia(id, '', 0, pos);
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
async function playMedia(id, season, epIndex, startSeconds = 0) {
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

    // On mobile, require landscape before opening player (prompt); await user decision / rotation
    try {
        await showRotatePrompt('enter-player');
    } catch(e) {
        // ignore and continue opening player
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

        // Determine whether to use Lumina's custom controls for this playback.
        // We explicitly disable custom controls for Google Drive embeds and for all "Pânico" (scream-*) films.
        let useCustomControls = true;
        try {
            const lowerHost = (hostForUrl || '').toLowerCase();
            // keep custom controls for common safe hosts by default
            if (lowerHost.includes('tokyvideo.com') || lowerHost.includes('tokyvideo')) {
                useCustomControls = true;
            }
            // hosts that historically break injected controls -> disable
            if (lowerHost.includes('brplayer') || lowerHost.includes('watch.brplayer')) {
                useCustomControls = false;
            }
            // certain IDs we prefer to avoid injecting controls into
            if (id === 'it-bem-vindos-a-derry') useCustomControls = false;
            if (id === 'heartstopper' && String(season) === '3') useCustomControls = false;
            // If the embed is a Google Drive host, prefer the native Drive player (no custom controls)
            if (isDriveEmbed) useCustomControls = false;
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
                        if (useCustomControls) {
    createPlayerControls(playerOverlay, true, () => player, { skipControls: false });
}
                    }

                    player.ready(() => {
                        try {
                            if (typeof startSeconds === 'number' && startSeconds > 0 && typeof player.currentTime === 'function') {
                                try { player.currentTime(Number(startSeconds)); } catch(e){}
                            }
                        } catch(e){}
                        player.play().catch(() => {
                            player.muted(true);
                            player.play().catch(()=>{});
                        });
                    });
                } catch (err) {
                    console.warn('Video.js load/init failed, falling back to native video element', err);
                    container.innerHTML = buildFrameWrapper(`
                        <video id="native-video" class="w-full h-full bg-black" src="${url}" poster="${poster}" playsinline webkit-playsinline preload="metadata"></video>
                    `);
                    const videoEl = document.getElementById('native-video');

                    // Ensure we seek only after metadata is available to reliably set currentTime for resume
                    if (videoEl) {
                        const trySeekAndPlay = () => {
                            try {
                                if (typeof startSeconds === 'number' && startSeconds > 0) {
                                    // clamp to safe number
                                    videoEl.currentTime = Math.max(0, Number(startSeconds));
                                }
                            } catch (e) { /* ignore */ }
                            // Attempt play; if blocked by autoplay policies we'll mute and retry
                            videoEl.play().catch(() => {
                                try {
                                    videoEl.muted = true;
                                    videoEl.play().catch(()=>{});
                                } catch (e) {}
                            });
                        };

                        // If metadata already loaded, perform seek/play immediately; otherwise wait for loadedmetadata
                        if (videoEl.readyState >= 1) {
                            trySeekAndPlay();
                        } else {
                            const onMeta = () => {
                                videoEl.removeEventListener('loadedmetadata', onMeta);
                                trySeekAndPlay();
                            };
                            videoEl.addEventListener('loadedmetadata', onMeta, { passive: true });
                        }
                    }

                    if (isMp4 && !isDriveEmbed) {
                        if (useCustomControls) {
    createPlayerControls(playerOverlay, true, () => videoEl, { skipControls: false });
}
                    }
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

                                    // If we have a starting offset, seek to it now (small timeout to ensure readiness)
                                    try {
                                        if (typeof startSeconds === 'number' && startSeconds > 0) {
                                            setTimeout(() => {
                                                try {
                                                    const inst = window.__luminaYTPlayerInstance;
                                                    if (inst && typeof inst.seekTo === 'function') {
                                                        inst.seekTo(Number(startSeconds), true);
                                                    }
                                                } catch(e){}
                                            }, 240);
                                        }
                                    } catch(e){}

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
                        // Only create Lumina custom controls for drive embeds if explicitly allowed by the earlier host/ID heuristics.
                        try {
                            if (useCustomControls) {
                                createPlayerControls(playerOverlay, true, () => {
                                    // iframe-based players don't expose a standard media API; return null so controls still render but gracefully no-op controls
                                    return null;
                                }, { skipControls: false });
                            }
                        } catch (e) { /* ignore */ }

                        // ensure overlay visibility follows whether custom controls are active
                        updateOverlayForMobile(playerOverlay, !!useCustomControls);

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

    // Save final playback position if possible (native video, Video.js, or YouTube API)
    try {
        const container = document.getElementById('player-container');
        // native video element (most direct)
        const v = container ? container.querySelector('video') : null;
        if (v) {
            const cur = Math.round(v.currentTime || 0);
            const playing = window.__lumina_current_playing || null;
            if (playing && playing.id) {
                addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), cur);
            }
        } 
        // Video.js player instance saved on overlay
        else if (playerOverlay._vjsPlayer) {
            try {
                const p = playerOverlay._vjsPlayer;
                const cur = typeof p.currentTime === 'function' ? Math.round(p.currentTime()) : 0;
                const playing = window.__lumina_current_playing || null;
                if (playing && playing.id) {
                    addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), cur);
                }
            } catch(e){}
        } 
        // YouTube IFrame API instance (if present)
        else if (window.__luminaYTPlayerInstance && typeof window.__luminaYTPlayerInstance.getCurrentTime === 'function') {
            try {
                const curFloat = window.__luminaYTPlayerInstance.getCurrentTime();
                const cur = Math.round(typeof curFloat === 'number' ? curFloat : 0);
                const playing = window.__lumina_current_playing || null;
                if (playing && playing.id) {
                    addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), cur);
                }
            } catch (e) { /* ignore */ }
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
    // Also remove the mobile floating close button if present
    const existingMobileClose = document.getElementById('lumina-mobile-close');
    if (existingMobileClose) {
        try { existingMobileClose.remove(); } catch(e){}
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
                // If the user is already in landscape on load, show an outside prompt asking to rotate to portrait
                try {
                    const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
                    if (isMobile && window.innerWidth > window.innerHeight) {
                        // show gentle prompt asking to rotate to vertical for browsing
                        setTimeout(() => showRotatePrompt('outside'), 500);
                    }
                } catch (e) {}
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
            // If user loaded in landscape, prompt to return to portrait for browsing
            try {
                const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
                if (isMobile && window.innerWidth > window.innerHeight) {
                    setTimeout(() => showRotatePrompt('outside'), 500);
                }
            } catch (e) {}
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

/* --- Dynamic rotate prompt (mode: 'enter-player' requires landscape; 'outside' requests portrait) --- */
function showRotatePrompt(mode = 'enter-player') {
    return new Promise((resolve) => {
        try {
            const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
            const isPortrait = window.innerHeight >= window.innerWidth;
            const isLandscape = window.innerWidth > window.innerHeight;

            // If not mobile, nothing to do
            if (!isMobile) return resolve();

            // Determine whether prompt is relevant for this mode
            if (mode === 'enter-player' && isLandscape) return resolve(); // already landscape, no need
            if (mode === 'outside' && isPortrait) return resolve(); // already portrait, no need

            const prompt = document.getElementById('rotate-prompt');
            const desc = document.getElementById('rotate-prompt-desc');
            const continueBtn = document.getElementById('rotate-continue-btn');
            const waitBtn = document.getElementById('rotate-wait-btn');

            if (!prompt || !desc) return resolve();

            // set text based on mode
            if (mode === 'enter-player') {
                // require landscape (horizontal) for playback
                desc.textContent = 'Para entrar no Reprodutor, gire o celular para HORIZONTAL (paisagem) para melhor experiência.';
            } else {
                // outside player request portrait (vertical) for browsing
                desc.textContent = 'Para navegar confortavelmente, mantenha o celular em VERTICAL (retrato).';
            }

            // show prompt
            prompt.classList.remove('hidden');
            prompt.style.display = 'flex';

            function checkOrientationAndCleanup() {
                if (mode === 'enter-player') {
                    if (window.innerWidth > window.innerHeight) cleanupAndResolve();
                } else {
                    if (window.innerHeight >= window.innerWidth) cleanupAndResolve();
                }
            }

            // If user chooses to continue anyway, resolve immediately
            function onContinue() { cleanupAndResolve(); }

            // Keep the prompt until orientation meets requirement or user continues
            function cleanupAndResolve() {
                try {
                    prompt.classList.add('hidden');
                    prompt.style.display = 'none';
                    window.removeEventListener('orientationchange', checkOrientationAndCleanup);
                    window.removeEventListener('resize', checkOrientationAndCleanup);
                    if (continueBtn) continueBtn.removeEventListener('click', onContinue);
                    if (waitBtn) waitBtn.removeEventListener('click', onContinue);
                } catch (e) {}
                resolve();
            }

            // Attach listeners
            window.addEventListener('orientationchange', checkOrientationAndCleanup, { passive: true });
            window.addEventListener('resize', checkOrientationAndCleanup, { passive: true });

            if (continueBtn) continueBtn.addEventListener('click', onContinue, { passive: true });
            if (waitBtn) {
                // clicking wait gives a small feedback but otherwise keeps the prompt visible
                waitBtn.addEventListener('click', () => {
                    try {
                        waitBtn.classList.add('animate-pulse');
                        setTimeout(() => waitBtn.classList.remove('animate-pulse'), 600);
                    } catch (e) {}
                }, { passive: true });
            }

            // Safety: auto-resolve after 10s to avoid blocking (user can still rotate later)
            const autoTimeout = setTimeout(() => { cleanupAndResolve(); }, 10000);
            const origCleanup = cleanupAndResolve;
            cleanupAndResolve = function() {
                clearTimeout(autoTimeout);
                origCleanup();
            };
        } catch (e) {
            resolve();
        }
    });
}

/* Controls and overlay behavior on mobile for non-custom embeds:
   When a player uses our custom controls we show the top overlay (REPRODUZINDO + back).
   For non-custom iframe/native embeds on mobile we hide that top overlay so clicks on the iframe
   do not open or interfere with the overlay controls. */
function updateOverlayForMobile(playerOverlay, hasCustomControls) {
    try {
        const topOverlay = document.querySelector('.player-overlay');
        if (!topOverlay) return;

        const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
        const inFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);

        // Always favor a visible overlay when in fullscreen so users have consistent access to controls.
        if (inFullscreen) {
            topOverlay.classList.add('overlay-visible');
            // ensure element is displayed flex to properly position its children
            topOverlay.style.display = 'flex';
            return;
        }

        // Non-fullscreen behaviour: on mobile hide overlay for opaque iframes unless we have custom controls
        if (isMobile) {
            if (hasCustomControls) {
                topOverlay.style.display = 'flex';
                // when custom controls exist, keep subtle non-blocking state; JS adds 'overlay-visible' when needed
                topOverlay.classList.toggle('overlay-visible', true);
            } else {
                // hide overlay to avoid intercepting taps on third-party players
                topOverlay.classList.remove('overlay-visible');
                topOverlay.style.display = 'none';
            }
        } else {
            // Desktop/tablet: keep overlay visible but non-blocking by default
            topOverlay.style.display = 'flex';
            topOverlay.classList.toggle('overlay-visible', true);
            // preserve pointer-events: let interactive children accept clicks per CSS rules
        }
    } catch (e) {
        // silent
    }
}

function createPlayerControls(playerOverlay, canControlVideo, getPlayerFn, options = {}) {
    // mark custom controls presence
    try { if (playerOverlay) playerOverlay._hasCustomControls = true; } catch(e){}
    if (options && options.skipControls) { try { if (playerOverlay) playerOverlay._hasCustomControls = false; } catch(e){}; return; }
    if (document.getElementById('lumina-player-controls')) return;

    // Modern responsive controls CSS (single injection) — optimized for touch (larger hit targets)
    if (!document.getElementById('lumina-player-controls-css')) {
        const css = document.createElement('style');
        css.id = 'lumina-player-controls-css';
        css.innerHTML = `
/* Layout */
#lumina-player-controls {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 18px;
  z-index: 99999;
  display:flex;
  gap:12px;
  align-items:center;
  justify-content:space-between;
  pointer-events:none;
  opacity:0;
  transform:translateY(12px);
  transition:opacity .18s ease, transform .18s cubic-bezier(.2,.9,.2,1);
  max-width:1200px;
  margin:0 auto;
  width:calc(100% - 24px);
}
#lumina-player-controls.visible{ pointer-events:auto; opacity:1; transform:translateY(0); }

/* Panels */
.lpc-left, .lpc-center, .lpc-right { display:flex; align-items:center; gap:10px; }
.lpc-left { flex:0 0 auto; }
.lpc-center { flex:1 1 auto; justify-content:center; gap:12px; }
.lpc-right { flex:0 0 auto; }

/* Buttons — increased sizes for mobile touch */
.lpc-btn { min-width:56px; height:56px; border-radius:14px; display:flex;align-items:center;justify-content:center;border:none;color:#fff;background:linear-gradient(90deg,#7c3aed,#d946ef);box-shadow:0 12px 36px rgba(124,58,237,0.18); font-size:18px; cursor:pointer; }
.lpc-small { width:48px; height:48px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); color:#fff; border-radius:12px; cursor:pointer; }
.lpc-btn:active, .lpc-small:active { transform:scale(.98); }

/* Time display */
.lpc-time { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace; font-size:13px; color:rgba(255,255,255,0.92); min-width:88px; text-align:center; }

/* Progress bar (improved and touch-friendly) */
.lpc-progress-wrap { position:relative; height:12px; border-radius:10px; background:rgba(255,255,255,0.06); width:100%; overflow:hidden; cursor:pointer; touch-action:none; }
.lpc-buffer { position:absolute; left:0; top:0; height:100%; background:linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04)); width:0%; }
.lpc-played { position:absolute; left:0; top:0; height:100%; background:linear-gradient(90deg,#a78bfa,#f472b6); width:0%; transition:width .12s linear; }
.lpc-thumb { position:absolute; left:0; top:50%; transform:translateY(-50%); width:18px; height:18px; border-radius:50%; background:#fff; box-shadow:0 8px 22px rgba(0,0,0,0.45); transform-origin:center; pointer-events:none; }

/* Range for precise scrubbing (visible on focus for accessibility) */
.lpc-scrub { position:absolute; inset:0; width:100%; height:100%; opacity:0; -webkit-appearance:none; appearance:none; cursor:pointer; }

/* Playback rate */
.lpc-rate-btn { padding:10px 12px; border-radius:12px; background:rgba(0,0,0,0.36); color:#fff; border:1px solid rgba(255,255,255,0.04); font-weight:700; cursor:pointer; }

/* Mobile adjustments */
@media (max-width:520px){
  #lumina-player-controls { bottom:14px; left:8px; right:8px; gap:8px; padding:8px; }
  .lpc-center { gap:8px; }
  .lpc-time { display:none; }
  .lpc-btn { min-width:50px; height:50px; }
  .lpc-small { width:44px; height:44px; }
  .lpc-progress-wrap { height:10px; border-radius:8px; }
  #lumina-mobile-close { position: fixed; left: 12px; top: 12px; z-index:100020; width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.36); color:white; border:1px solid rgba(255,255,255,0.06); box-shadow:0 10px 30px rgba(0,0,0,0.6); }
  #lumina-mobile-close.show { opacity:1; transform:translateY(0); }
}

/* Small utility */
.lpc-hidden { display:none !important; }
        `;
        document.head.appendChild(css);
    }

    // Build controls DOM
    const controls = document.createElement('div');
    controls.id = 'lumina-player-controls';
    controls.innerHTML = `
      <div class="lpc-left">
        <button class="lpc-small lpc-btn-close" title="Fechar (Esc)"><i class="fa-solid fa-arrow-left"></i></button>
        <button class="lpc-small lpc-prev-ep" title="Episódio anterior"><i class="fa-solid fa-backward-step"></i></button>
        <button class="lpc-small lpc-back-10" title="-10s"><i class="fa-solid fa-rotate-left"></i></button>
        <button class="lpc-btn lpc-play" title="Play/Pause"><i class="fa-solid fa-play"></i></button>
        <button class="lpc-small lpc-forward-10" title="+10s"><i class="fa-solid fa-rotate-right"></i></button>
        <button class="lpc-small lpc-next-ep" title="Próximo episódio"><i class="fa-solid fa-forward-step"></i></button>
      </div>
      <div class="lpc-center">
        <div class="lpc-time lpc-current">00:00</div>
        <div class="lpc-progress-wrap" aria-label="Barra de progresso" role="slider" tabindex="0">
            <div class="lpc-buffer"></div>
            <div class="lpc-played"></div>
            <div class="lpc-thumb" aria-hidden="true"></div>
            <input class="lpc-scrub" type="range" min="0" max="100" value="0" />
        </div>
        <div class="lpc-time lpc-duration">00:00</div>
      </div>
      <div class="lpc-right">
        <button class="lpc-rate-btn" title="Velocidade">1x</button>
        <button class="lpc-small lpc-full" title="Fullscreen"><i class="fa-solid fa-expand"></i></button>
      </div>
    `;
    const attachPoint = document.getElementById('player-frame-wrapper') || document.getElementById('player-container') || document.body;
    attachPoint.appendChild(controls);

    // Mobile close button (improved placement & always available on touch)
    if (!document.getElementById('lumina-mobile-close')) {
        const mClose = document.createElement('button');
        mClose.id = 'lumina-mobile-close';
        mClose.title = 'Fechar';
        mClose.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
        mClose.style.opacity = '0';
        mClose.addEventListener('click', () => closePlayer());
        document.body.appendChild(mClose);
    }

    // Element refs
    const btnPlay = controls.querySelector('.lpc-play');
    const btnClose = controls.querySelector('.lpc-btn-close');
    const btnBack10 = controls.querySelector('.lpc-back-10');
    const btnFwd10 = controls.querySelector('.lpc-forward-10');
    const btnPrevEp = controls.querySelector('.lpc-prev-ep');
    const btnNextEp = controls.querySelector('.lpc-next-ep');
    const btnFull = controls.querySelector('.lpc-full');
    const rateBtn = controls.querySelector('.lpc-rate-btn');

    const timeCur = controls.querySelector('.lpc-current');
    const timeDur = controls.querySelector('.lpc-duration');
    const progressWrap = controls.querySelector('.lpc-progress-wrap');
    const playedEl = controls.querySelector('.lpc-played');
    const bufferEl = controls.querySelector('.lpc-buffer');
    const thumb = controls.querySelector('.lpc-thumb');
    const scrub = controls.querySelector('.lpc-scrub');

    // Helper: resolve current media (video-js facade or native)
    function resolveMediaFacade() {
        try {
            const p = (canControlVideo && typeof getPlayerFn === 'function') ? getPlayerFn() : null;
            if (!p) {
                const container = document.getElementById('player-container');
                if (!container) return null;
                const v = container.querySelector('video');
                return v || null;
            }
            // Video.js-like player
            if (p && typeof p.currentTime === 'function' && typeof p.duration === 'function') {
                return {
                    type: 'videojs',
                    inst: p,
                    play: () => p.play(),
                    pause: () => p.pause(),
                    paused: () => p.paused ? p.paused() : false,
                    currentTime: (v) => typeof v === 'number' ? p.currentTime(v) : p.currentTime(),
                    duration: () => p.duration ? p.duration() : NaN,
                    buffered: () => (typeof p.buffered === 'function' ? p.buffered() : null),
                    mute: (m) => p.muted ? p.muted(m) : null
                };
            }
            // native video element
            if (p && p.tagName && p.tagName.toLowerCase() === 'video') {
                const v = p;
                return {
                    type: 'native',
                    inst: v,
                    play: () => v.play(),
                    pause: () => v.pause(),
                    paused: () => v.paused,
                    currentTime: (val) => typeof val === 'number' ? (v.currentTime = val) : v.currentTime,
                    duration: () => v.duration || NaN,
                    buffered: () => v.buffered || null,
                    mute: (m) => v.muted = !!m
                };
            }
            return null;
        } catch (e) { return null; }
    }

    // Time formatting
    function fmt(sec) {
        if (!sec || isNaN(sec)) return '00:00';
        sec = Math.floor(sec);
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60).toString().padStart(2,'0');
        const s = (sec % 60).toString().padStart(2,'0');
        return h ? `${h}:${m}:${s}` : `${m}:${s}`;
    }

    // Playback rate options
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    let rateIndex = 2; // default 1x
    rateBtn.addEventListener('click', () => {
        rateIndex = (rateIndex + 1) % rates.length;
        const newRate = rates[rateIndex];
        const media = resolveMediaFacade();
        try {
            // Video.js instance
            if (media && media.type === 'videojs' && media.inst) {
                try {
                    if (typeof media.inst.playbackRate === 'function') media.inst.playbackRate(newRate);
                    else if (typeof media.inst.playbackRate === 'number') media.inst.playbackRate = newRate;
                } catch (e) { /* ignore */ }
            }
            // Native video element
            else if (media && media.type === 'native' && media.inst) {
                try { media.inst.playbackRate = newRate; } catch (e) {}
            } else {
                const nv = document.querySelector('#player-container video');
                if (nv) try { nv.playbackRate = newRate; } catch (e) {}
            }
            if (window.__luminaYTPlayerInstance && typeof window.__luminaYTPlayerInstance.setPlaybackRate === 'function') {
                try { window.__luminaYTPlayerInstance.setPlaybackRate(newRate); } catch (e) {}
            }
        } catch (e) {}
        rateBtn.textContent = newRate + 'x';
    });

    // Play/pause
    btnPlay.addEventListener('click', () => {
        const m = resolveMediaFacade();
        if (!m) return;
        try {
            if (m.paused()) { m.play(); btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>'; }
            else { m.pause(); btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>'; }
        } catch (e) {}
    });

    // Close / snippet controls
    btnClose.addEventListener('click', closePlayer);
    btnBack10.addEventListener('click', () => { const m = resolveMediaFacade(); if (!m) return; try { m.currentTime(Math.max(0, m.currentTime() - 10)); } catch(e){} });
    btnFwd10.addEventListener('click', () => { const m = resolveMediaFacade(); if (!m) return; try { m.currentTime(Math.min((m.duration()||0), m.currentTime() + 10)); } catch(e){} });
    btnPrevEp.addEventListener('click', () => { try { /* reuse earlier helper */ navigateEpisode && navigateEpisode(-1); } catch(e){} });
    btnNextEp.addEventListener('click', () => { try { navigateEpisode && navigateEpisode(1); } catch(e){} });

    btnFull.addEventListener('click', () => {
        const wrapper = document.getElementById('player-frame-wrapper') || document.getElementById('player-container');
        if (wrapper && wrapper.requestFullscreen) wrapper.requestFullscreen();
    });

    // Enhanced scrub interactions: support touch gestures and reduce jank
    let userScrubbing = false;
    function setScrubUI(pct, instant = true) {
        playedEl.style.width = (pct*100) + '%';
        thumb.style.left = (pct*100) + '%';
        scrub.value = String(Math.round(pct*100));
    }

    scrub.addEventListener('input', (e) => {
        userScrubbing = true;
        const pct = Number(e.target.value || 0) / 100;
        const m = resolveMediaFacade();
        const dur = m ? (m.duration() || 0) : 0;
        const t = dur * pct;
        setScrubUI(pct);
        timeCur.textContent = fmt(t);
    }, { passive: true });

    scrub.addEventListener('change', (e) => {
        const pct = Number(e.target.value || 0) / 100;
        const m = resolveMediaFacade();
        if (!m) { userScrubbing = false; return; }
        const dur = m.duration() || 0;
        try { m.currentTime(dur * pct); } catch(e){}
        setTimeout(()=> userScrubbing = false, 120);
    }, { passive: true });

    // Touch-drag on progress for more responsive seeking on mobile
    let dragging = false;
    function handlePointerDown(ev) {
        dragging = true;
        userScrubbing = true;
        progressWrap.setPointerCapture && progressWrap.setPointerCapture(ev.pointerId);
    }
    function handlePointerMove(ev) {
        if (!dragging) return;
        const rect = progressWrap.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, (ev.clientX - rect.left)));
        const pct = x / rect.width;
        setScrubUI(pct);
        const m = resolveMediaFacade();
        const dur = m ? (m.duration() || 0) : 0;
        timeCur.textContent = fmt(dur * pct);
    }
    function handlePointerUp(ev) {
        if (!dragging) return;
        dragging = false;
        userScrubbing = false;
        const rect = progressWrap.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, (ev.clientX - rect.left)));
        const pct = x / rect.width;
        const m = resolveMediaFacade();
        const dur = m ? (m.duration() || 0) : 0;
        try { if (m) m.currentTime(dur * pct); } catch(e){}
        progressWrap.releasePointerCapture && progressWrap.releasePointerCapture(ev.pointerId);
    }
    progressWrap.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Click on progress to seek (fallback for non-pointer)
    progressWrap.addEventListener('click', (ev) => {
        const rect = progressWrap.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, x / rect.width));
        const m = resolveMediaFacade();
        if (!m) return;
        const dur = m.duration() || 0;
        try { m.currentTime(dur * pct); } catch(e){}
    });

    // Update UI loop (sync current time, duration, buffer) with lower interval for mobile battery saving
    const uiInterval = setInterval(() => {
        const m = resolveMediaFacade();
        if (!m) return;
        try {
            const dur = m.duration() || 0;
            const cur = m.currentTime();
            if (!userScrubbing) {
                const pct = (dur > 0 && !isNaN(cur)) ? Math.max(0, Math.min(1, cur / dur)) : 0;
                setScrubUI(pct);
                timeCur.textContent = fmt(cur);
            }
            timeDur.textContent = fmt(dur);
            // buffered
            let bufPct = 0;
            try {
                const b = m.buffered ? m.buffered() : null;
                if (b && typeof b.length === 'number' && b.length > 0) {
                    const end = b.end(b.length - 1);
                    bufPct = dur > 0 ? Math.max(0, Math.min(1, end / dur)) : 0;
                }
            } catch (e) { bufPct = 0; }
            bufferEl.style.width = (bufPct*100) + '%';

            // Play/pause icon sync
            const paused = m.paused();
            btnPlay.innerHTML = `<i class="fa-solid ${paused ? 'fa-play' : 'fa-pause'}"></i>`;

            // persist playback position periodically (throttled)
            const playing = window.__lumina_current_playing || null;
            if (playing && playing.id && typeof cur === 'number' && !isNaN(cur)) {
                addToHistory(playing.id, (playing.episodeIndex !== null ? (contentDB.find(i=>i.id===playing.id)?.seasons?.[playing.season]?.[playing.episodeIndex]?.title || '') : contentDB.find(i=>i.id===playing.id)?.title), null, (playing.episodeIndex !== undefined ? playing.episodeIndex : null), Math.round(cur));
            }
        } catch (e) {}
    }, 300);

    // Auto-show / hide controls on pointer activity (touch-friendly): keep controls visible on mobile while interacting
    let hideTimer = null;
    function showControls() {
        controls.classList.add('visible');
        const ytBtn = document.getElementById('lumina-yt-playpause');
        const topOverlay = document.querySelector('.player-overlay');
        const mClose = document.getElementById('lumina-mobile-close');
        if (ytBtn) { ytBtn.style.opacity = '1'; ytBtn.style.pointerEvents = 'auto'; }
        if (topOverlay) { topOverlay.style.opacity = '1'; topOverlay.style.pointerEvents = 'auto'; }
        if (mClose) {
            const isMobile = ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520;
            if (isMobile) { mClose.style.opacity = '1'; mClose.classList.add('show'); }
            else { mClose.style.opacity = '0'; mClose.classList.remove('show'); }
        }
        if (hideTimer) clearTimeout(hideTimer);
        // On touch devices, keep controls visible longer to avoid accidental disappearance during interaction
        const timeout = (('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.innerWidth <= 520) ? 3600 : 1700;
        hideTimer = setTimeout(() => {
            controls.classList.remove('visible');
            if (ytBtn) { ytBtn.style.opacity = '0'; ytBtn.style.pointerEvents = 'none'; }
            if (topOverlay) { topOverlay.style.opacity = '0'; topOverlay.style.pointerEvents = 'none'; }
            if (mClose) { mClose.style.opacity = '0'; mClose.classList.remove('show'); }
        }, timeout);
    }
    // use passive true where safe; pointer events used above handle dragging
    ['mousemove','click','touchstart','pointerdown'].forEach(evt => {
        try {
            (document.getElementById('player-container') || document).addEventListener(evt, showControls, { passive:true });
        } catch (e){}
    });

    // initial reveal
    setTimeout(showControls, 220);

    // Ensure overlay visibility on mobile when custom controls are present
    try { updateOverlayForMobile(playerOverlay, true); } catch(e){}

    // cleanup
    controls._cleanup = () => {
        try {
            clearInterval(uiInterval);
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            // remove pointer listeners
            progressWrap.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            // remove DOM nodes
            controls.remove();
            const mClose = document.getElementById('lumina-mobile-close'); if (mClose) mClose.remove();
            if (playerOverlay) playerOverlay._hasCustomControls = false;
        } catch(e){}
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
