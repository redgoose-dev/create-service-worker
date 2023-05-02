# create-service-worker

서비스워커 제작 툴입니다.  
단순히 스크립트를 작성해서 사용해도 되겠지만 서비스에서 사용하는 캐시관리 때문에 별도의 스크립트를 작성하게 된것입니다.


## 특징

이 도구에서 다음과 같은 기능을 가지고 있습니다.

### 캐시버전 관리

빌드를 실행할때마다 timestamp 값을 추가하여 업데이트마다 새로운 캐시를 업데이트 하도록 도와줍니다.

### 캐시등록

캐시할 파일들 목록을 일일히 입력해줘야 하지만 번들링된 파일들을 자동으로 목록으로 만들 수 있습니다.


## Usage

일반적인 부분에서 사용방법은 다음과 같습니다.

```javascript
import createServiceWorker from '@redgoose/create-service-worker'

const paths = await createServiceWorker({
  target: 'dist',
  output: '',
  ignore: {
    files: [
      '.DS_Store',
      'index.html',
      'sw.js',
    ],
    children: {
      images: { files: [ '.DS_Store' ] },
    },
  },
})

console.log(paths) // [ 'index.html' ]
```

### with vite

vite 플러그인으로 사용하려면 다음과 같이 사용합니다. `build` 과정에서 사용되며, 빌드가 끝나면 실행됩니다.

```javascript
import createServiceWorker from '@redgoose/create-service-worker/bundle/vite.plugin'

const config = defineConfig(({ mode }) => {
  return {
    plugins: [
      createServiceWorker({
        pathServiceWorker: 'dist/sw.js',
        pathServiceWorkerTarget: 'dist/sw.js',
        cacheName: 'app-cache',
        splitKeyword: '// END OF RESOURCE //',
        serviceWorker: {
          target: 'dist',
          output: '',
          ignore: {
            files: [
              '.DS_Store',
              'robots.txt',
              'manifest.webmanifest',
              'sw.js',
            ],
            children: {
              images: { files: [ '.DS_Store' ] },
            },
          }
        },
      }),
    ],
  }
})
```


## Options

### basic

- `target` {string}
- `output` {string}
- `ignore` {object}

### vite

- `pathServiceWorker` {string} 업데이트할 서비스워커 위치
- `pathServiceWorkerTarget` {string} 서비스워커를 저장하는 위치
- `cacheName` {string} // 캐시이름
- `splitKeyword` {string} sw.js 소스중에 분리할 키워드 설정
- `serviceWorker` {object} Options/basic 섹션의 값으로 사용됩니다.


## write sw.js file

간단하게 서비스워커 스크립트를 작성할 수 있습니다.  
개발용으로 다음과 같이 작용하고, 빌드하면 스플릿 값 `// END OF RESOURCE //` 위의 값으로 교체합니다. (개발용과 빌드용을 구분하여 캐시이름과 리소스를 바꿔서 사용합니다.)

```javascript
const CACHE_NAME = 'demo-cache-v1'
const CACHE_RESOURCE = [
  '/favicon.ico',
  '/index.html',
]

// END OF RESOURCE //

self.addEventListener('fetch', event => {})
```
