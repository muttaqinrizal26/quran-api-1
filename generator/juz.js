const { writeFile, readFile } = require('fs').promises

async function generateJuz() {
  const juz = []
  console.info('> Generating juz...')
  const contents = (await readFile('./data/quran.json', 'utf-8')).replace(/\\u/g, '%u')
  const { data: quran } = JSON.parse(contents)
  
  for (let i = 0; i < 29; i++) {
    quran.forEach(surah => {
      surah.verses.forEach(verse => {
        if (verse.meta.juz === (i + 1)) {
          if (!juz[i]) juz[i] = {}
          if (!juz[i].verses) juz[i].verses = [];
          juz[i].verses.push({ ...verse, surah })
        }
      })
    })
  }

  const data = JSON.stringify(juz, null, 2)
  console.log({ data })
  
  // TODO: write to file (Err: Invalid string length)
  // await writeFile('./data/quran-juz.json', )
  console.info('> Done!')
}

generateJuz()
