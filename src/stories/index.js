export const loadAll = () => {
    const context = require.context('../', true, /\.stories.js$/)
    context.keys().forEach(key => {
        context(key)
    });
}
