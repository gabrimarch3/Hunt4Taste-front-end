if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let t = {};
    const f = (e) => a(e, n),
      d = { module: { uri: n }, exports: t, require: f };
    s[n] = Promise.all(i.map((e) => d[e] || f(e))).then((e) => (c(...e), t));
  };
}
define(["./workbox-fb87826f"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "5ae0d34db21b88bf609cafe86ffaafb9",
        },
        {
          url: "/_next/static/7dp0UsYfviv-YTmnX8Kpq/_buildManifest.js",
          revision: "e0a21c7d7f93d89dce16df0231dc76f2",
        },
        {
          url: "/_next/static/7dp0UsYfviv-YTmnX8Kpq/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/20-22bd21dec3914f50.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/385cb88d-0a5407f437a11025.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/545-bdf473d83ef660e1.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/5e22fd23-e644cca841d8dfcf.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/69-407479e9e277f3b9.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/749-c8dc1d5a80ac2f83.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/8e1d74a4-03820e395586fb82.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/969-406046c2a330273f.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/_not-found-095b0943cb382e13.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/esperienze/page-256ee6e71e8d306c.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/esperienze/prenota/page-4422ba47a9f83d3e.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/layout-0f7efa2003da2927.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/page-5aedeb3977800f89.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/shop/cart/page-0282f69e6547a684.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/shop/page-e486827ba2afff37.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/app/wine-house/page-d1f20050b33b710f.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/fd9d1056-278f759219ca9de7.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/framework-aec844d2ccbe7592.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/main-233aeaaa4b6d36f6.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/main-app-38b8b8426a9fe40b.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/pages/_app-75f6107b0260711c.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-ae428070e745e557.js",
          revision: "7dp0UsYfviv-YTmnX8Kpq",
        },
        {
          url: "/_next/static/css/0d605a547386c949.css",
          revision: "0d605a547386c949",
        },
        {
          url: "/_next/static/css/32a39bb8609b1ee0.css",
          revision: "32a39bb8609b1ee0",
        },
        {
          url: "/_next/static/css/a21c136f479b8521.css",
          revision: "a21c136f479b8521",
        },
        {
          url: "/_next/static/media/02205c9944024f15-s.p.woff2",
          revision: "4cf1e387b8e1c64a73ef01c8d1e14681",
        },
        {
          url: "/_next/static/media/0e4fe491bf84089c-s.p.woff2",
          revision: "5e22a46c04d947a36ea0cad07afcc9e1",
        },
        {
          url: "/_next/static/media/1c57ca6f5208a29b-s.woff2",
          revision: "491a7a9678c3cfd4f86c092c68480f23",
        },
        {
          url: "/_next/static/media/3511fdf6750b518d-s.woff2",
          revision: "e85775fd86060618bd4125d14654c36e",
        },
        {
          url: "/_next/static/media/37b0c0a51409261e-s.woff2",
          revision: "5ce748f413aee42a8d4723df0d18830b",
        },
        {
          url: "/_next/static/media/3d8af05b1dbb5df8-s.woff2",
          revision: "94a5fb88423f24f3981739bfbf345680",
        },
        {
          url: "/_next/static/media/3dbd163d3bb09d47-s.woff2",
          revision: "93dcb0c222437699e9dd591d8b5a6b85",
        },
        {
          url: "/_next/static/media/42d52f46a26971a3-s.woff2",
          revision: "b44d0dd122f9146504d444f290252d88",
        },
        {
          url: "/_next/static/media/44c3f6d12248be7f-s.woff2",
          revision: "705e5297b1a92dac3b13b2705b7156a7",
        },
        {
          url: "/_next/static/media/46c894be853ec49f-s.woff2",
          revision: "47891b6adb3a947dd3c594bd5196850e",
        },
        {
          url: "/_next/static/media/4a8324e71b197806-s.woff2",
          revision: "5fba57b10417c946c556545c9f348bbd",
        },
        {
          url: "/_next/static/media/506bd11311670951-s.woff2",
          revision: "7976a92314c8770252603e7813da9f67",
        },
        {
          url: "/_next/static/media/5647e4c23315a2d2-s.woff2",
          revision: "e64969a373d0acf2586d1fd4224abb90",
        },
        {
          url: "/_next/static/media/627622453ef56b0d-s.p.woff2",
          revision: "e7df3d0942815909add8f9d0c40d00d9",
        },
        {
          url: "/_next/static/media/71ba03c5176fbd9c-s.woff2",
          revision: "2effa1fe2d0dff3e7b8c35ee120e0d05",
        },
        {
          url: "/_next/static/media/7be645d133f3ee22-s.woff2",
          revision: "3ba6fb27a0ea92c2f1513add6dbddf37",
        },
        {
          url: "/_next/static/media/7c53f7419436e04b-s.woff2",
          revision: "fd4ff709e3581e3f62e40e90260a1ad7",
        },
        {
          url: "/_next/static/media/7d8c9b0ca4a64a5a-s.p.woff2",
          revision: "0772a436bbaaaf4381e9d87bab168217",
        },
        {
          url: "/_next/static/media/80a2a8cc25a3c264-s.woff2",
          revision: "2d3d8a78ef164ab6c1c62a3e57c2727b",
        },
        {
          url: "/_next/static/media/83e4d81063b4b659-s.woff2",
          revision: "bd30db6b297b76f3a3a76f8d8ec5aac9",
        },
        {
          url: "/_next/static/media/8db47a8bf03b7d2f-s.p.woff2",
          revision: "49003e0ff09f1efb8323cf35b836ba8f",
        },
        {
          url: "/_next/static/media/8fb72f69fba4e3d2-s.woff2",
          revision: "7a2e2eae214e49b4333030f789100720",
        },
        {
          url: "/_next/static/media/912a9cfe43c928d9-s.woff2",
          revision: "376ffe2ca0b038d08d5e582ec13a310f",
        },
        {
          url: "/_next/static/media/934c4b7cb736f2a3-s.p.woff2",
          revision: "1f6d3cf6d38f25d83d95f5a800b8cac3",
        },
        {
          url: "/_next/static/media/94300924a0693016-s.woff2",
          revision: "105927314bd3f089b99c0dda456171ed",
        },
        {
          url: "/_next/static/media/9e48537b1b020091-s.woff2",
          revision: "4b52fd954ca934c204d73ddbc640e5d4",
        },
        {
          url: "/_next/static/media/a50efca067c45ff7-s.woff2",
          revision: "0ea6e3886fc7639170a8e69463f4113e",
        },
        {
          url: "/_next/static/media/a5b77b63ef20339c-s.woff2",
          revision: "96e992d510ed36aa573ab75df8698b42",
        },
        {
          url: "/_next/static/media/a6d330d7873e7320-s.woff2",
          revision: "f7ec4e2d6c9f82076c56a871d1d23a2d",
        },
        {
          url: "/_next/static/media/af961b7eb9a15f7e-s.woff2",
          revision: "2bbd1a9c77461a3bfbff4c9b3a43a89e",
        },
        {
          url: "/_next/static/media/baf12dd90520ae41-s.woff2",
          revision: "8096f9b1a15c26638179b6c9499ff260",
        },
        {
          url: "/_next/static/media/bbdb6f0234009aba-s.woff2",
          revision: "5756151c819325914806c6be65088b13",
        },
        {
          url: "/_next/static/media/bd976642b4f7fd99-s.woff2",
          revision: "cc0ffafe16e997fe75c32c5c6837e781",
        },
        {
          url: "/_next/static/media/c0058a8df935bb33-s.woff2",
          revision: "815d6a78ad78085bd8593051c2631f4a",
        },
        {
          url: "/_next/static/media/cff529cd86cc0276-s.woff2",
          revision: "c2b2c28b98016afb2cb7e029c23f1f9f",
        },
        {
          url: "/_next/static/media/d117eea74e01de14-s.woff2",
          revision: "4d1e5298f2c7e19ba39a6ac8d88e91bd",
        },
        {
          url: "/_next/static/media/dbe242b5c3b9d8cb-s.woff2",
          revision: "29445a64b7a514e94024e97416f26ecd",
        },
        {
          url: "/_next/static/media/de9eb3a9f0fa9e10-s.woff2",
          revision: "7155c037c22abdc74e4e6be351c0593c",
        },
        {
          url: "/_next/static/media/dfa8b99978df7bbc-s.woff2",
          revision: "7a500aa24dccfcf0cc60f781072614f5",
        },
        {
          url: "/_next/static/media/e25729ca87cc7df9-s.woff2",
          revision: "9a74bbc5f0d651f8f5b6df4fb3c5c755",
        },
        {
          url: "/_next/static/media/eb52b768f62eeeb4-s.woff2",
          revision: "90687dc5a4b6b6271c9f1c1d4986ca10",
        },
        {
          url: "/_next/static/media/f06116e890b3dadb-s.woff2",
          revision: "2855f7c90916c37fe4e6bd36205a26a8",
        },
        {
          url: "/icon-192x192.png",
          revision: "4f7a74a14f4177ad78d0391517136edf",
        },
        {
          url: "/icon-256x256.png",
          revision: "2c6d643e9650415ff11d4d9771caf138",
        },
        {
          url: "/icon-384x384.png",
          revision: "ec15446de8947327ab2cbe40615b89ef",
        },
        {
          url: "/icon-512x512.png",
          revision: "d5ce5209be700acdfca7489dc49ec762",
        },
        { url: "/manifest.json", revision: "f21539431ea0211acbfac13fd652f0b0" },
        { url: "/next.svg", revision: "8e061864f388b47f33a1c3780831193e" },
        { url: "/vercel.svg", revision: "61c6b19abff40ea7acd577be818f3976" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
