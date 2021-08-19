module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|gif)$': 'jest-transform-stub',
  },
};
