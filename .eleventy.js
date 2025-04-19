module.exports = function (eleventyConfig) {
  // Copy static assets to the output folder
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: "content",       // Source content lives here now
      includes: "../_includes", // Adjusted to reach _includes at project root
      output: "_site"
    }
  };
};
