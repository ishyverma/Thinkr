import markdownit from 'markdown-it';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import "highlight.js/styles/atom-one-dark.css";

interface MarkdownProps {
    text: string;
}

const md: any = markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="overflow-x-auto m-0 px-4 rounded-lg bg-gray-900 text-white break-words  whitespace-pre-wrap">
                            <code class="hljs ${lang} p-0 m-0 block rounded-lg">` +
                                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                            `</code>
                        </pre>`;
            } catch (__) {}
        }
        return `<div class="code-block">
            <pre><code class="hljs">` + md.utils.escapeHtml(str) + `</code></pre>
            <button class="copy-btn" data-clipboard-text="${str}">📋 Copy</button>
        </div>`;
    }
})

const Markdown = ({ text }: MarkdownProps) => {
    const htmlContent = md.render(text)
    const sanitizedContent = DOMPurify.sanitize(htmlContent)
    
    return (  
        <div className='prose prose-blue max-w-none dark:prose-invert tex-black dark:text-white' dangerouslySetInnerHTML={{ __html: sanitizedContent}}></div>
    );
}
 
export default Markdown;