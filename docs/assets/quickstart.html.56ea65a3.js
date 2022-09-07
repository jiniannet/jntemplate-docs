import{_ as n,o as a,c as s,e as t}from"./app.a952a5ca.js";const e={},p=t(`<h1 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> Quick Start</h1><h2 id="create-template-from-file" tabindex="-1"><a class="header-anchor" href="#create-template-from-file" aria-hidden="true">#</a> create template from file</h2><p><strong>Example</strong>\uFF1A</p><p>default.html</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>hello,$name<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>c# code</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> template <span class="token operator">=</span> Engine<span class="token punctuation">.</span><span class="token function">LoadTemplate</span><span class="token punctuation">(</span><span class="token string">&quot;c:\\\\default.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
template<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;jntemplate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>output:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>hello,jntemplate<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="create-template-from-text" tabindex="-1"><a class="header-anchor" href="#create-template-from-text" aria-hidden="true">#</a> create template from text</h2><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> template <span class="token operator">=</span> Engine<span class="token punctuation">.</span><span class="token function">CreateTemplate</span><span class="token punctuation">(</span><span class="token string">&quot;&lt;p&gt;hello,$name&lt;/p&gt;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
template<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;jntemplate&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">Render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>output:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>hello,jntemplate<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),c=[p];function l(o,u){return a(),s("div",null,c)}const r=n(e,[["render",l],["__file","quickstart.html.vue"]]);export{r as default};