<div align="center">
<img src="https://telegra.ph/file/3b6aa5e41e8cb0ea51574.jpg" alt="ARI" width="300" />

![ARI](https://socialify.git.ci/LoliKillers/api-samehadaku/image?description=1&font=Source%20Code%20Pro&forks=1&language=1&owner=1&pattern=Floating%20Cogs&stargazers=1&theme=Dark) <br>

<p align="center">
<a href="https://wa.me/6285852203076" alt="Whatsapp!"> <img src="https://aleen42.github.io/badges/src/whatsapp.svg" /> </a>
<a href="https://github.com/LoliKillers/api-samehadaku/graphs/commit-activity" alt="Maintenance"> <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" /> </a>
</p>
<p align="center">
<a href="https://github.com/LoliKillers/api-samehadaku" alt="GitHub closed issues"> <img src="https://img.shields.io/github/issues-closed-raw/LoliKillers/api-samehadaku?style=flat&logo=github&color=success" /> </a>
<a href="https://github.com/LoliKillers/api-samehadaku" alt="GitHub commit activity"> <img src="https://img.shields.io/github/commit-activity/m/LoliKillers/api-samehadaku" /> </a>
<a href="https://github.com/LoliKillers/api-samehadaku/graphs/contributors" alt="GitHub contributors"> <img src="https://img.shields.io/github/contributors/LoliKillers/api-samehadaku?style=flat&logo=github" /> </a>
<a href="https://github.com/LoliKillers/api-samehadaku/network/members" alt="GitHub forks"> <img src="https://img.shields.io/github/forks/LoliKillers/api-samehadaku?label=Forks&logo=github" /> </a>
<a href="https://github.com/LoliKillers/api-samehadaku" alt="GitHub closed pull requests"> <img src="https://img.shields.io/github/issues-pr-closed-raw/LoliKillers/api-samehadaku?color=success" /> </a>
<a href="https://github.com/LoliKillers/api-samehadaku" alt="GitHub issues"> <img src="https://img.shields.io/github/issues-raw/LoliKillers/api-samehadaku?style=flat&logo=github&color=yellow" /> </a>
</p>
</div>

# API SAMEHADAKU

>
>
>
</div>
<p align="center">
  <a href="https://github.com/LoliKillers"><img title="Author" src="https://img.shields.io/badge/Author-Loli Killers-red.svg?style=for-the-badge&logo=github" /></a>
  <h4 align="center">
</h4>
</p>

## Note
Api samehadaku adalah rest-api yang mengarah ke [samehadaku](https://samehadaku.vip) website yang saya dibuat menggunakan Express.

## Contoh
Contoh rest api [Samehadaku](https://loli-samehadaku.herokuapp.com/) yang sudah saya buat

## Installation

Download dan install terlebih dahulu package [npm](https://npmjs.com/)

* Clone repo ini terlebih dahulu
* Install semua packagae/module yang akan di gunakan
```bash
npm install
```

## Usage

Untuk memulai server, ketik perintah dibawah melalui CMD:
```bash
npm start
```
Atau
```bash
npm run nodemon
```
Dan buka tauatan [localhost:8080](http://localhost:8080/)

## Endpoint

| Url        | Params           | Type | Keterangan |
| ------------- |:-------------:| :-----:|  :-----|
| /      | - | - | beranda  
| /page/{page}    | page     |  angka | halaman beranda |
| /blog   | -     |  - | blog |
| /blog/{page}   | page     |  angka | halaman blog |
| /blog/read/{id}   | id     |  String | baca blog |
| /anime/{id}   | id     |  String | detail anime |
| /anime/eps/{link}   | link     |  String | detail episode anime |
| /search/{title}/{page}   | judul, halaman     |  String, angka | cari anime |
| /season | -     |  - | daftar season dari anime |
| /date-release | -     |  - | tanggal rilis anime |
| /list-anime/{page} | page     |  angka | daftar dari semua anime |
| /blog-category/{category}/{page} | kategori, halaman     |  String, angka | daftar item dari halaman |
| /tag/{tag} | tag   |  String | daftar item dari tag |
| /daftar-genre | -   |  String | daftar genre|
| /genre/{id} | id   |  String | menampilkan anime dari genre |


## Sample response

Hasil result json : https://loli-samehadaku.herokuapp.com/
```json
{
    title: "Re:Zero kara Hajimeru Isekai Seikatsu Season 2",
    status: "Ongoing",
    link: "https://samehadaku.vip/anime/rezero-kara-hajimeru-isekai-seikatsu-season-2/",
    linkId: "rezero-kara-hajimeru-isekai-seikatsu-season-2",
    image: "https://i0.wp.com/samehadaku.vip/wp-content/uploads/2020/07/108005.jpg?quality=90&resize=150,210",
    rating: "8.79",
    sinopsis: "Musim Kedua dari Serial Re:Zero kara Hajimeru Isekai Seikatsu.",
    genre: [
        "Drama",
        "Fantasy",
        "Psychological",
        "Thriller"
    ]
},
```

## Credits 📍
* Nah, itu semua ada dalam sejarah komit
Jangan ragu untuk membuka permintaan tarik jika anda menemukan kesalahan
* Jangan lupa untuk meninhgalkan bintang ok
* Dan tunggu update saya selanjutnya!!👣
* Mastah diem yak, jangan dibuli, namanya juga pemula stah


## License
[MIT](https://choosealicense.com/licenses/mit/)
Copyright (c) 2020-present
