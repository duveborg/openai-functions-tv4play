
export const movieFields = `
id
genres
playableFrom {
  isoString
}
synopsis {
  brief
}
title
productionYear
productionCountries {
  name
}
isLiveContent
`

export const clipFields = `
id
description
playableFrom {
isoString
}
images {
main16x9 {
    source
}
}
`

export const sportEventFields = `
id
country
arena
commentators
league
playableFrom {
isoString
}
round
season
synopsis {
brief
}
title
productionYear
isLiveContent
`

export const episodeFields = `
id
episodeNumber
playableFrom {
  isoString
}
synopsis {
  brief
}
title
seasonId
`

export const seriesFields = `
genres
id
synopsis {
brief
}
title
trailers {
mp4
}
`