
export const movieFields = `
__typename
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
__typename
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
__typename
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
__typename
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
__typename
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