CMS.registerEditorComponent({
    id: "figure",
    label: "Figure",
    fields: [{
        name: "title",
        label: "Title",
        widget: "string",
    }, {
        name: "alt",
        label: "Description",
        widget: "string"
    }, {
        name: "src",
        label: "Image",
        widget: "image"
    }, {
        name: "width",
        label: "Width",
        widget: "number"
    }, {
        name: "height",
        label: "Height",
        widget: "number"
    }, {
        name: "loading",
        label: "Loading",
        widget: "string"
    }, {
        name: "class",
        label: "Class",
        widget: "string"
    }, {
        name: "link",
        label: "Link",
        widget: "string"
    }, {
        name: "target",
        label: "Target",
        widget: "string"
    }, {
        name: "rel",
        label: "Rel",
        widget: "string"
    }, {
        name: "caption",
        label: "Caption",
        widget: "text"
    }, {
        name: "attr",
        label: "Attribution",
        widget: "string"
    }, {
        name: "attrlink",
        label: "Attribution Link",
        widget: "string"
    }],
    pattern: /{{<\s*figure(.*)>}}/,
    fromBlock: function (input) {
        let output = {alt: "", src: "", title: "", width: "", height: "", loading: "", class: "", link: "", target: "", rel: "", caption: "", attr: "", attrlink: ""}
        let options = input[1].match(/\w+\s*=\s*"[^"]*"/g);
        if (options) {
            options.forEach((i) => {
                const keyValue = i.split("=");
                output = {...output, [keyValue[0]]: keyValue[1].replace(/"/g, '')}
            });
        }
        return output;
    },
    toBlock: function (obj) {
        let options = "";
        options += obj.src ? ` src="${obj.src}"` : '';
        options += obj.alt ? ` alt="${obj.alt}"` : '';
        options += obj.title ? ` title="${obj.title}"` : '';
        options += obj.width ? ` width="${obj.width}"` : '';
        options += obj.height ? ` height="${obj.height}"` : '';
        options += obj.loading ? ` loading="${obj.loading}"` : '';
        options += obj.class ? ` class="${obj.class}"` : '';
        options += obj.link ? ` link="${obj.link}"` : '';
        options += obj.target ? ` target="${obj.target}"` : '';
        options += obj.rel ? ` rel="${obj.rel}"` : '';
        options += obj.caption ? ` caption="${obj.caption}"` : '';
        options += obj.attr ? ` attr="${obj.attr}"` : '';
        options += obj.attrlink ? ` attrlink="${obj.attrlink}"` : '';
        return `{{< figure${options}>}}`;
    },
    toPreview: (obj, getAsset, fields) => {
        const {title, alt, src, width, height, loading, class: className, link, target, rel, caption, attr, attrlink} = obj;
        const imageField = fields?.find(f => f.get('widget') === 'image');
        const imgSrc = getAsset(src, imageField);
        let imgTag = `<img src="${imgSrc}" alt="${alt || ''}"`;
        imgTag += width ? ` width="${width}"` : '';
        imgTag += height ? ` height="${height}"` : '';
        imgTag += loading ? ` loading="${loading}"` : '';
        imgTag += '>';
        let imgWrapped = imgTag;
        if (link) {
            imgWrapped = `<a href="${link}"${target ? ` target="${target}"` : ''}${rel ? ` rel="${rel}"` : ''}>${imgTag}</a>`;
        }
        let figcaption = '';
        if (title || caption || attr) {
            figcaption = '<figcaption>';
            if (title) figcaption += `<h4>${title}</h4>`;
            if (caption) figcaption += `<div>${caption}</div>`;
            if (attr) {
                if (attrlink) {
                    figcaption += ` <a href="${attrlink}">${attr}</a>`;
                } else {
                    figcaption += ` ${attr}`;
                }
            }
            figcaption += '</figcaption>';
        }
        return `<figure${className ? ` class="${className}"` : ''}>${imgWrapped}${figcaption}</figure>`;
    },
});
