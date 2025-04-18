module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};