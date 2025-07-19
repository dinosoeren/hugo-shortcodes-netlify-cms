CMS.registerEditorComponent({
    id: "figure",
    label: "Figure",
    fields: [{
        name: "title",
        label: "Title",
        widget: "string",
        required: false
    }, {
        name: "alt",
        label: "Alt text",
        widget: "string",
        required: false
    }, {
        name: "src",
        label: "Image",
        widget: "image",
        required: true
    }, {
        name: "width",
        label: "Width",
        widget: "number",
        required: false
    }, {
        name: "height",
        label: "Height",
        widget: "number",
        required: false
    }, {
        name: "loading",
        label: "Loading",
        widget: "string",
        required: false
    }, {
        name: "class",
        label: "Class",
        widget: "string",
        required: false
    }, {
        name: "link",
        label: "Link",
        widget: "string",
        required: false
    }, {
        name: "target",
        label: "Target",
        widget: "string",
        required: false
    }, {
        name: "rel",
        label: "Rel",
        widget: "string",
        required: false
    }, {
        name: "caption",
        label: "Caption",
        widget: "text",
        required: false
    }, {
        name: "attr",
        label: "Attribution",
        widget: "string",
        required: false
    }, {
        name: "attrlink",
        label: "Attribution Link",
        widget: "string",
        required: false
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
CMS.registerEditorComponent({
    id: "gist",
    label: "Gist",
    fields: [{
            name: "username",
            label: "Github Username",
            widget: "string"
        },
        {
            name: "gid",
            label: "Gist ID",
            widget: "string"
        },
    ],
    pattern: /{{< gist ([a-zA-Z0-9]+) ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            username: match[1],
            gid: match[2],
        };
    },
    toBlock: function(obj) {
        return `{{< gist ${obj.username} ${obj.gid} >}}`;
    },
    toPreview: function(obj) {
        return `{{< gist ${obj.username} ${obj.gid} >}}`;
    },
});
CMS.registerEditorComponent({
    id: "instagram",
    label: "Instagram",
    fields: [
      {
          name: "pid",
          label: "Post id",
          widget: "string"
      },
      {
        name: "hidecaption",
        label: "Hide caption",
        widget: "boolean"
      }
    ],
    pattern: /{{< instagram (?<pid>[a-zA-Z0-9]+)\s{0,}(?<hidecaption_flag>hidecaption)?\s+>}}/,
    fromBlock: function(match) {
        return {
            pid: match[1],
            hidecaption: match[2]
        };
    },
    toBlock: function(obj) {
        return `{{< instagram ${obj.pid} ${
          obj.hidecaption ? "hidecaption " : ""
        }>}}`;
    },
    toPreview: function(obj) {
        return `{{< instagram ${obj.pid} ${
          obj.hidecaption ? "hidecaption " : ""
        }>}}`;
    },
});
CMS.registerEditorComponent({
    id: "twitter",
    label: "Twitter",
    fields: [{
        name: "tid",
        label: "Tweet id",
        widget: "string"
    }],
    pattern: /{{< tweet ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            tid: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< tweet ${obj.tid} >}}`;
    },
    toPreview: function(obj) {
        return `{{< tweet ${obj.tid} >}}`;
    },
});
CMS.registerEditorComponent({
    id: "vimeo",
    label: "Vimeo",
    fields: [{
        name: "shortcode",
        label: "Vimeo shortcode",
        widget: "string"
    }],
    pattern: /{{< vimeo ([a-zA-Z0-9]+) >}}/,
    fromBlock: function(match) {
        return {
            shortcode: match[1]
        };
    },
    toBlock: function(obj) {
        return `{{< vimeo ${obj.shortcode} >}}`;
    },
    toPreview: function(obj) {
        return `{{< vimeo ${obj.shortcode} >}}`;
    },
});
CMS.registerEditorComponent({
    id: "youtube",
    label: "Youtube",
    fields: [{
        name: "id",
        label: "Youtube Video ID",
        widget: "string"
    }],
    pattern: /{{< youtube\s+(?<id>[A-Za-z0-9\-_]+)\s+>}}/,
    fromBlock: function(match) {
        return {
            id: match[1],
        };
    },
    toBlock: function(obj) {
        return `{{< youtube ${obj.id} >}}`;
    },
    toPreview: function(obj) {
        return `<img src="https://i3.ytimg.com/vi/${obj.id}/hqdefault.jpg" alt="Youtube Video"/>`;
    },
});
