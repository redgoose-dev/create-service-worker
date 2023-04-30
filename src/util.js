import fs from 'fs'

/**
 * get files in directory
 * @param {string} path 부모 패스
 * @param {string[]} ignoreNames 스킵할때의 파일이름
 * @param {string} outPath 출력용 패스
 * @param {function} _nestedFunc 중첩용 콜백함수
 * @return {string[]}
 */
export function getFiles(path, ignoreNames, outPath, _nestedFunc)
{
  let result = []
  const files = fs.readdirSync(path, { withFileTypes: true })
  files.forEach(file => {
    if (file.isDirectory())
    {
      if (_nestedFunc && typeof _nestedFunc === 'function')
      {
        const arr = _nestedFunc(file.name)
        if (arr && arr.length > 0) result = result.concat(arr)
      }
      else
      {
        result = result.concat(
          getFiles(
            `${path}/${file.name}`,
            ignoreNames,
            `${outPath}/${file.name}`,
            undefined
          )
        )
      }
    }
    else
    {
      if (!(ignoreNames.indexOf(file.name) > -1))
      {
        result.push(`${outPath}/${file.name}`)
      }
    }
  })
  return result
}
