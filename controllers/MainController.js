const scraperjs = require('scraperjs')

class MainController {
  home({ params: { page } }, req) {
    page = typeof page === 'undefined' ? '' : page === '1' ? '' : `page/${page.toString()}/`
    scraperjs.StaticScraper.create(`https://194.163.183.129/${page}`).scrape(
      async ($) => {
        const obj = {}
        obj.season = $('.animposx')
          .map(function () {
            return {
              title: $(this).find('.data .title').text().replace(' ', ''),
              status: $(this).find('.data .type').text(),
              link: $(this).find('a').attr('href'),
              linkId: $(this)
                .find('a')
                .attr('href')
                .replace('https://194.163.183.129/anime/', '')
                .replace('/', ''),
              image: $(this)
                .find('a .content-thumb img')
                .attr('src')
                .replace('quality=80', 'quality=100'),
              rating: $(this).find('a .content-thumb .score').text().trim(),
            }
          })
          .get()
          .slice(0, 5)

        await Promise.all(
          obj.season.map(async (e) => {
            await scraperjs.StaticScraper.create(e.link).scrape(($) => {
              e.sinopsis = $('.desc .entry-content-single p')
                .map(function () {
                  return $(this).text()
                })
                .get()[0]
              e.genre = $('.genre-info a')
                .map(function () {
                  return $(this).text()
                })
                .get()
              return e
            })
            return true
          }),
        )

        obj.latest = $('.post-show ul li')
          .map(function () {
            return {
              title: $(this).find('.dtla .entry-title a').text(),
              episode: $(this).find('.dtla span:first-of-type author').text(),
              postedBy: $(this).find('.dtla span:nth-of-type(2) author').text(),
              release_time: $(this)
                .find('.dtla span:last-of-type')
                .text()
                .replace(' Released on: ', ''),
              link: $(this).find('.dtla .entry-title a').attr('href'),
              image: $(this)
                .find('.thumb a img')
                .attr('src')
                .replace('quality=80', 'quality=100'),
            }
          })
          .get()

        req.send(obj)
      },
    )
  }

  blog({ params: { page } }, req) {
    page = typeof page === 'undefined'
      ? ''
      : page === '1'
        ? ''
        : `page/${page.toString()}/`
    scraperjs.StaticScraper.create(
      `https://194.163.183.129/blog/${page}`,
    ).scrape(($) => {
      const blog = {}
      blog.blog = $('.box-blog')
        .map(function () {
          return {
            title: $(this).find('h2 a').text(),
            sub: $(this).find('.exp p').text(),
            date: $(this).find('.auth i').text(),
            link: $(this).find('.img a').attr('href'),
            linkId: $(this)
              .find('.img a')
              .attr('href')
              .replace('https://194.163.183.129/blog/', '')
              .replace('/', '')
              .trim(),
            image: $(this).find('.img a img').attr('src'),
          }
        })
        .get()

      req.send(blog)
    })
  }

  readblog({ params: { id } }, req) {
    const page = `https://194.163.183.129/blog/${id}`

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}
      data.title = $('.sttle h1.entry-title')
        .map(function () {
          return $(this).text()
        })
        .get()[0]
      data.author = $('.author.vcard')
        .map(function () {
          return $(this).find('span').text()
        })
        .get()[0]
      data.date_created = $('span.date')
        .map(function () {
          return $(this).text()
        })
        .get()[0]
      data.image_cover = $('.thumb-blog')
        .map(function () {
          return $(this).find('img').attr('src')
        })
        .get()[0]
      data.content = $('.entry-content.content-post p')
        .filter(function () {
          if ($(this).text() === '') {
            data.image_content = $(this).find('img').attr('src')
          }
          return $(this).text() !== ''
        })
        .map(function () {
          return {
            text: $(this).text(),
            img: $(this).find('img').attr('src'),
          }
        })
        .get()
      data.tags = $('.post_taxs a')
        .map(function () {
          return {
            title: $(this).text(),
            link: $(this).attr('href'),
            active: $(this).attr('class') !== 'posts_tags',
          }
        })
        .get()

      req.send(data)
    })
  }

  tag({ params: { tag } }, req) {
    const page = `https://194.163.183.129/tag/${tag}`

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}
      data.tag = $('h1.page-title').map(function () {
        return $(this).text().replace('Tag: ', '')
      })[0]
      data.results = $('.site-main .animpost')
        .map(function () {
          return {
            title: $(this).find('.animepost .stooltip .title h4').text(),
            view: $(this)
              .find('.animepost .stooltip .metadata span:last-of-type')
              .text()
              .replace(' Dilihat', ''),
            image: $(this).find('.animepost .animposx img').attr('src'),
            sinopsis: $(this).find('.animepost .stooltip .ttls').text().trim(),
            status: $(this)
              .find('.animepost .animposx a .data .type')
              .text()
              .trim(),
            link: $(this).find('.animepost .animposx a').attr('href'),
            linkId: $(this)
              .find('.animepost .animposx a')
              .attr('href')
              .replace('https://194.163.183.129/anime/', '')
              .replace('/', ''),
          }
        })
        .get()

      req.send(data)
    })
  }

  blogcategory({ params: { category } }, req) {
    const page = `https://194.163.183.129/blog-category/${category}`

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}
      data.category = $('h1.page-title').map(function () {
        return $(this).text().replace('Blog Category: ', '')
      })[0]
      data.results = $('.box-blog')
        .map(function () {
          return {
            title: $(this).find('h2 a').text(),
            sub: $(this).find('.exp p').text(),
            date: $(this).find('.auth i').text(),
            link: $(this).find('.img a').attr('href'),
            linkId: $(this)
              .find('.img a')
              .attr('href')
              .replace('https://194.163.183.129/blog/', '')
              .replace('/', '')
              .trim(),
            image: $(this).find('.img a img').attr('src'),
          }
        })
        .get()

      req.send(data)
    })
  }

  blogCategoryByPage({ params: { category, page } }, req) {
    const pager = `https://194.163.183.129/blog-category/${category}/page/${page}`

    scraperjs.StaticScraper.create(pager).scrape(($) => {
      const data = {}
      data.category = $('h1.page-title').map(function () {
        return $(this).text().replace('Blog Category: ', '')
      })[0]
      data.results = $('.box-blog')
        .map(function () {
          return {
            title: $(this).find('h2 a').text(),
            sub: $(this).find('.exp p').text(),
            date: $(this).find('.auth i').text(),
            link: $(this).find('.img a').attr('href'),
            linkId: $(this)
              .find('.img a')
              .attr('href')
              .replace('https://194.163.183.129/blog/', '')
              .replace('/', '')
              .trim(),
            image: $(this).find('.img a img').attr('src'),
          }
        })
        .get()

      req.send(data)
    })
  }

  daftarGenre(_, req) {
    scraperjs.StaticScraper.create('https://194.163.183.129/').scrape(($) => {
      const obj = {}
      obj.daftar_genere = $('.genre > li').map(function () {
        const span = $(this).find('span').text()
        return {
          nama_genre: $(this).text().replace(span, ''),
          link: $(this).find('a').attr('href'),
          linkid: $(this).find('a').attr('href').replace('https://194.163.183.129/genre/', ''),
          total: span,
        }
      }).get()
      req.send(obj)
    })
  }

  anime({ params: { id } }, req) {
    const page = `https://194.163.183.129/anime/${id}/`
    scraperjs.StaticScraper.create(page).scrape(async ($) => {
      const data = {}

      data.title = $('.infox h1')
        .map(function () {
          return $(this).text()
        })
        .get()[0]

      data.sinopsis = $('.entry-content.entry-content-single p')
        .map(function () {
          return $(this).text()
        })
        .get()[0]

      data.image = $('.thumb img')
        .map(function () {
          return $(this).attr('src').replace('quality=80', 'quality=100')
        })
        .get()[0]

      data.genre = $('.genre-info a')
        .map(function () {
          return {
            text: $(this).text(),
            link: $(this).attr('href'),
          }
        })
        .get()

      data.ratingValue = $('[itemprop=ratingValue]')
        .map(function () {
          return $(this).text()
        })
        .get()[0]

      data.ratingCount = $('[itemprop=ratingCount]')
        .map(function () {
          return $(this).text()
        })
        .get()[0]

      data.detail = {}
      let tmp
      tmp = $('.spe span:nth-of-type(1)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(3)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(5)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(7)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(9)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(11)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(2)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(4)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(6)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(8)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(10)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      tmp = $('.spe span:nth-of-type(12)')
        .map(function () {
          let text = $(this).text().split(' ')
          const first = text[0] === 'Total' ? (text[0] + text[1]).replace(' ', '') : text[0]

          if (text[0] === 'Total') {
            text.shift()
            text.shift()
          } else {
            text.shift()
          }

          text = text.join(' ')
          return [first, text]
        })
        .get()
      data.detail[tmp[0]] = tmp[1]

      data.youtube = $('iframe')
        .map(function () {
          return {
            link: $(this).attr('src'),
            id: $(this)
              .attr('src')
              .replace('https://www.youtube.com/embed/', '')
              .trim(),
          }
        })
        .get()[0]
      data.list_episode = $('.lstepsiode.listeps ul li')
        .map(function () {
          return {
            episode: $(this).find('.epsright .eps a').text(),
            title: $(this).find('.epsleft .lchx a').text(),
            date_uploaded: $(this).find('.epsleft .date').text(),
            link: $(this).find('.epsright .eps a').attr('href'),
            id: $(this)
              .find('.epsright .eps a')
              .attr('href')
              .replace('https://194.163.183.129/', ''),
          }
        })
        .get()

      await scraperjs.StaticScraper.create(
        data.list_episode[data.list_episode.length - 1].link,
      ).scrape(async ($) => {
        data.recommend = await Promise.all(
          $('.animposx')
            .map(async function () {
              const data = {
                link: $(this).find('a').attr('href'),
                image: $(this)
                  .find('a img')
                  .attr('src')
                  .replace('quality=80', 'quality=100'),
                title: $(this).find('a img').attr('title'),
              }

              await scraperjs.StaticScraper.create(
                $(this).find('a').attr('href'),
              ).scrape(($) => {
                data.genre = $('.genre-info a')
                  .map(function () {
                    return $(this).text()
                  })
                  .get()
              })

              return data
            })
            .get(),
        )
      })

      await scraperjs.StaticScraper.create('https://194.163.183.129/').scrape(
        async ($) => {
          data.latest = await Promise.all(
            $('.post-show ul li')
              .slice(0, 5)
              .map(async function () {
                const data = {
                  title: $(this).find('.dtla .entry-title a').text(),
                  episode: $(this)
                    .find('.dtla span:first-of-type author')
                    .text(),
                  postedBy: $(this)
                    .find('.dtla span:nth-of-type(2) author')
                    .text(),
                  release_time: $(this)
                    .find('.dtla span:last-of-type')
                    .text()
                    .replace(' Released on: ', ''),
                  link: $(this).find('.dtla .entry-title a').attr('href'),
                  image: $(this).find('.thumb a img').attr('src').split('?')[0],
                }

                await scraperjs.StaticScraper.create(
                  $(this).find('.dtla .entry-title a').attr('href'),
                ).scrape(($) => {
                  data.genre = $('.genre-info a')
                    .map(function () {
                      return $(this).text()
                    })
                    .get()
                })

                return data
              })
              .get(),
          )
        },
      )

      req.send(data)
    })
  }

  async readanime({ params: { link } }, req) {
    const page = `https://194.163.183.129/${link}/`

    scraperjs.StaticScraper.create(page).scrape(async ($) => {
      const data = {}
      data.title = $('h1.entry-title')
        .map(function () {
          return $(this).text()
        })
        .get()[0]
      data.eps = $('span[itemprop=episodeNumber]')
        .map(function () {
          return $(this).text()
        })
        .get()[0]
      data.uploader = $('span.year')
        .map(function () {
          return $(this).text().replace('Diposting oleh ', '').split(' - ')[0]
        })
        .get()[0]
      data.date_uploaded = $('span.year')
        .map(function () {
          return $(this).text().replace('Diposting oleh ', '').split(' - ')[1]
        })
        .get()[0]
      data.detail_anime = {
        title: $('.infoanime .infox h2.entry-title')
          .map(function () {
            return $(this).text()
          })
          .get()[0],
        image: $('.infoanime .thumb img')
          .map(function () {
            return $(this).attr('src').replace('quality=80', 'quality=100')
          })
          .get()[0],
        sinopsis: $('.infoanime .infox .desc div')
          .map(function () {
            return $(this).text()
          })
          .get()[0],
        genres: $('.infoanime .infox .genre-info a')
          .map(function () {
            return $(this).text()
          })
          .get(),
      }
      data.downloadEps = $('.download-eps')
        .map(function () {
          return {
            format: $(this).find('p').text(),
            data: $(this)
              .find('ul li')
              .map(function () {
                return {
                  quality: $(this).find('strong').text(),
                  link: {
                    zippyshare: $(this)
                      .find('span:nth-of-type(1) a')
                      .attr('href'),
                    gdrive: $(this).find('span:nth-of-type(2) a').attr('href'),
                    reupload: $(this)
                      .find('span:nth-of-type(3) a')
                      .attr('href'),
                  },
                }
              })
              .get(),
          }
        })
        .get()

      data.recommend = $('.animposx')
        .map(function () {
          const data = {
            link: $(this).find('a').attr('href'),
            image: $(this)
              .find('a img')
              .attr('src')
              .replace('quality=80', 'quality=100'),
            title: $(this).find('a img').attr('title'),
          }

          return data
        })
        .get()

      req.send(data)
    })
  }

  search({ params: { title } }, req) {
    const page = `https://194.163.183.129/?s=${title}`

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}
      data.results = $('.site-main .animpost')
        .map(function () {
          return {
            title: $(this).find('.animepost .stooltip .title h4').text(),
            score: $(this).find('.animepost .stooltip .skor').text().trim(),
            view: $(this)
              .find('.animepost .stooltip .metadata span:last-of-type')
              .text()
              .replace(' Dilihat', ''),
            image: $(this)
              .find('.animepost .animposx img')
              .attr('src')
              .replace('quality=80', 'quality=100'),
            sinopsis: $(this).find('.animepost .stooltip .ttls').text().trim(),
            genres: $(this)
              .find('.animepost .stooltip .genres .mta a')
              .map(function () {
                return $(this).text()
              })
              .get(),
            status: $(this)
              .find('.animepost .animposx a .data .type')
              .text()
              .trim(),
            link: $(this).find('.animepost .animposx a').attr('href'),
            linkId: $(this)
              .find('.animepost .animposx a')
              .attr('href')
              .replace('https://194.163.183.129/anime/', '')
              .replace('/', ''),
          }
        })
        .get()

      req.send(data)
    })
  }

  searchByPage({ params: { title, page } }, req) {
    const pager = `https://194.163.183.129/page/${page}/?s=${title}`

    scraperjs.StaticScraper.create(pager).scrape(($) => {
      const data = {}
      data.results = $('.site-main .animpost')
        .map(function () {
          return {
            title: $(this).find('.animepost .stooltip .title h4').text(),
            score: $(this).find('.animepost .stooltip .skor').text().trim(),
            view: $(this)
              .find('.animepost .stooltip .metadata span:last-of-type')
              .text()
              .replace(' Dilihat', ''),
            image: $(this)
              .find('.animepost .animposx img')
              .attr('src')
              .split('?')[0],
            sinopsis: $(this).find('.animepost .stooltip .ttls').text().trim(),
            genres: $(this)
              .find('.animepost .stooltip .genres .mta a')
              .map(function () {
                return $(this).text()
              })
              .get(),
            status: $(this)
              .find('.animepost .animposx a .data .type')
              .text()
              .trim(),
            link: $(this).find('.animepost .animposx a').attr('href'),
            linkId: $(this)
              .find('.animepost .animposx a')
              .attr('href')
              .replace('https://194.163.183.129/anime/', '')
              .replace('/', ''),
          }
        })
        .get()

      req.send(data)
    })
  }

  season(_, req) {
    const page = 'https://194.163.183.129/season/spring-2020/'

    scraperjs.StaticScraper.create(page)
      .scrape(($) => {
        const data = {}

        data.title = $('.widget-title h1.page-title')
          .map(function () {
            return $(this).text()
          })
          .get()[0]

        data.results = $('.relat .animpost')
          .map(function () {
            return {
              title: $(this).find('.animepost .stooltip .title h4').text(),
              score: $(this).find('.animepost .stooltip .skor').text().trim(),
              view: $(this)
                .find('.animepost .stooltip .metadata span:last-of-type')
                .text()
                .replace(' Dilihat', ''),
              image: $(this)
                .find('.animepost .animposx img')
                .attr('src')
                .split('?')[0],
              sinopsis: $(this)
                .find('.animepost .stooltip .ttls')
                .text()
                .trim(),
              genres: $(this)
                .find('.animepost .stooltip .genres .mta a')
                .map(function () {
                  return $(this).text()
                })
                .get(),
              status: $(this)
                .find('.animepost .animposx a .data .type')
                .text()
                .trim(),
              link: $(this).find('.animepost .animposx a').attr('href'),
              linkId: $(this)
                .find('.animepost .animposx a')
                .attr('href')
                .replace('https://194.163.183.129/anime/', '')
                .replace('/', ''),
            }
          })
          .get()

        return data
      })
      .then((data) => {
        const page = 'https://194.163.183.129/season/spring-2020/page/2/'

        scraperjs.StaticScraper.create(page).scrape(($) => {
          const results = $('.relat .animpost')
            .map(function () {
              return {
                title: $(this).find('.animepost .stooltip .title h4').text(),
                score: $(this).find('.animepost .stooltip .skor').text().trim(),
                view: $(this)
                  .find('.animepost .stooltip .metadata span:last-of-type')
                  .text()
                  .replace(' Dilihat', ''),
                image: $(this)
                  .find('.animepost .animposx img')
                  .attr('src')
                  .replace('quality=80', 'quality=100'),
                sinopsis: $(this)
                  .find('.animepost .stooltip .ttls')
                  .text()
                  .trim(),
                genres: $(this)
                  .find('.animepost .stooltip .genres .mta a')
                  .map(function () {
                    return $(this).text()
                  })
                  .get(),
                status: $(this)
                  .find('.animepost .animposx a .data .type')
                  .text()
                  .trim(),
                link: $(this).find('.animepost .animposx a').attr('href'),
                linkId: $(this)
                  .find('.animepost .animposx a')
                  .attr('href')
                  .replace('https://194.163.183.129/anime/', '')
                  .replace('/', ''),
              }
            })
            .get()

          data.results = [...data.results, ...results]

          req.send(data)
        })
      })
  }

  date(_, req) {
    const page = 'https://194.163.183.129/jadwal-rilis/'

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}

      data.title = 'Jadwal Rilis'

      const day = $('.schedule .tab-dates')
        .map(function () {
          return $(this).text().trim()
        })
        .get()
      data.results = $('.schedule .result-schedule')
        .map(function (index) {
          return {
            day: day[index],
            list: $(this)
              .find('.animepost')
              .map(function () {
                return {
                  title: $(this).find('.animposx a .data .title').text().trim(),
                  image: $(this)
                    .find('.animposx a .content-thumb img')
                    .attr('src')
                    .replace('quality=80', 'quality=100'),
                  score: $(this)
                    .find('.animposx a .content-thumb .score')
                    .text()
                    .trim(),
                  genres: $(this)
                    .find('.animposx a .data .type')
                    .text()
                    .trim()
                    .split(', '),
                  link: $(this).find('.animposx a').attr('href'),
                  linkId: $(this)
                    .find('.animposx a')
                    .attr('href')
                    .replace('https://194.163.183.129/anime/', '')
                    .replace('/', ''),
                }
              })
              .get(),
          }
        })
        .get()

      req.send(data)
    })
  }

  listWithoutPage(_, req) {
    const page = 'https://194.163.183.129/daftar-anime/'

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}

      data.title = 'Daftar Anime'

      data.results = $('.site-main .animpost')
        .map(function () {
          return {
            title: $(this).find('.animepost .stooltip .title h4').text(),
            score: $(this).find('.animepost .stooltip .skor').text().trim(),
            view: $(this)
              .find('.animepost .stooltip .metadata span:last-of-type')
              .text()
              .replace(' Dilihat', ''),
            image: $(this)
              .find('.animepost .animposx img')
              .attr('src')
              .replace('quality=80', 'quality=100'),
            sinopsis: $(this).find('.animepost .stooltip .ttls').text().trim(),
            genres: $(this)
              .find('.animepost .stooltip .genres .mta a')
              .map(function () {
                return $(this).text()
              })
              .get(),
            status: $(this)
              .find('.animepost .animposx a .data .type')
              .text()
              .trim(),
            link: $(this).find('.animepost .animposx a').attr('href'),
            linkId: $(this)
              .find('.animepost .animposx a')
              .attr('href')
              .replace('https://194.163.183.129/anime/', '')
              .replace('/', ''),
          }
        })
        .get()

      req.send(data)
    })
  }

  listWithPage({ params: { page } }, req) {
    const inPage = `https://194.163.183.129/daftar-anime/page/${page}/`

    scraperjs.StaticScraper.create(inPage).scrape(($) => {
      const data = {}

      data.title = 'Daftar Anime'

      data.results = $('.site-main .animpost')
        .map(function () {
          return {
            title: $(this).find('.animepost .stooltip .title h4').text(),
            score: $(this).find('.animepost .stooltip .skor').text().trim(),
            view: $(this)
              .find('.animepost .stooltip .metadata span:last-of-type')
              .text()
              .replace(' Dilihat', ''),
            image: $(this)
              .find('.animepost .animposx img')
              .attr('src')
              .replace('quality=80', 'quality=100'),
            sinopsis: $(this).find('.animepost .stooltip .ttls').text().trim(),
            genres: $(this)
              .find('.animepost .stooltip .genres .mta a')
              .map(function () {
                return $(this).text()
              })
              .get(),
            status: $(this)
              .find('.animepost .animposx a .data .type')
              .text()
              .trim(),
            link: $(this).find('.animepost .animposx a').attr('href'),
            linkId: $(this)
              .find('.animepost .animposx a')
              .attr('href')
              .replace('https://194.163.183.129/anime/', '')
              .replace('/', ''),
          }
        })
        .get()

      req.send(data)
    })
  }

  searchByGenre({ params: { genre } }, req) {
    const page = `https://194.163.183.129/genre/${genre}`

    scraperjs.StaticScraper.create(page).scrape(($) => {
      const data = {}
      data.genre = $('h1.page-title').map(function () {
        return $(this).text().replace('Genre: ', '')
      })[0]
      data.results = $('.site-main .animpost')
        .map(function () {
          return {
            title: $(this).find('.animepost .stooltip .title h4').text(),
            score: $(this).find('.animepost .stooltip .skor').text().trim(),
            view: $(this)
              .find('.animepost .stooltip .metadata span:last-of-type')
              .text()
              .replace(' Dilihat', ''),
            image: $(this)
              .find('.animepost .animposx img')
              .attr('src')
              .replace('quality=80', 'quality=100'),
            sinopsis: $(this).find('.animepost .stooltip .ttls').text().trim(),
            genres: $(this)
              .find('.animepost .stooltip .genres .mta a')
              .map(function () {
                return $(this).text()
              })
              .get(),
            status: $(this)
              .find('.animepost .animposx a .data .type')
              .text()
              .trim(),
            link: $(this).find('.animepost .animposx a').attr('href'),
            linkId: $(this)
              .find('.animepost .animposx a')
              .attr('href')
              .replace('https://194.163.183.129/anime/', '')
              .replace('/', ''),
          }
        })
        .get()

      req.send(data)
    })
  }
}

module.exports = new MainController()
