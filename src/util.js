import fs from 'fs'

/**
 * get files in directory
 * @param {string} path 부모 패스
 * @param {string} output 출력용 패스
 * @param {object} ignore 스킵할때의 파일이름
 * @return {string[]}
 */
export function getFiles(path, output, ignore)
{
  let result = []
  const files = fs.readdirSync(path, { withFileTypes: true })
  files.forEach(file => {
    if (ignore?.files?.length > 0)
    {
      if (ignore.files.indexOf(file.name) > -1) return
    }
    if (file.isDirectory())
    {
      result = result.concat(
        getFiles(
          `${path}/${file.name}`,
          `${output}/${file.name}`,
          ignore?.children || undefined
        )
      )
    }
    else
    {
      result.push(`${output}/${file.name}`)
    }
  })
  return result
}
