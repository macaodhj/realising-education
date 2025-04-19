module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin"); // 💡 This ensures /admin is copied
  eleventyConfig.addPassthroughCopy("img");   // Optional, if using image uploads

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
