import { b as createForwardRef, I as createPresence, m as mergeFunc, u as useEventListener, e as createTag, f as assert, F as FocusNavigator, al as getFocusableElements, q as createOwnerAttribute } from '../routes/_..._.mjs';
import { ssrHydrationKey, escape, ssr, dynamic, ssrAttribute, mergeProps, memo } from '@solidjs/web';
import { createSignal, createUniqueId, omit, createContext, createEffect, useContext, For } from 'solid-js';
import '@solidjs/web/storage';
import '@solidjs/web/server-functions';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

var _m$$1 = /* @__PURE__ */ Symbol();
var _m$2$1 = /* @__PURE__ */ Symbol();
var _m$3 = /* @__PURE__ */ Symbol();
var _m$4 = /* @__PURE__ */ Symbol();
var _m$5 = /* @__PURE__ */ Symbol();
var _m$6 = /* @__PURE__ */ Symbol();
var _m$7 = /* @__PURE__ */ Symbol();
var _m$8 = /* @__PURE__ */ Symbol();
var _m$9 = /* @__PURE__ */ Symbol();
var _m$10 = /* @__PURE__ */ Symbol();
var _d$$1 = {
  get() {
    const ownerID = this[_m$$1];
    const labelID = this[_m$2$1];
    const contentID = this[_m$3];
    const props = this[_m$4];
    const label = this[_m$5];
    return {
      ownerID,
      labelID,
      contentID,
      getSize() {
        return props.size;
      },
      isBusy() {
        return !!props.busy;
      },
      hasLabel: label.isPresent,
      registerLabel: label.register
    };
  },
  enumerable: true,
  configurable: true
};
var _d$2$1 = {
  get() {
    const Root = this[_m$6];
    const ownerID = this[_m$$1];
    const setRef = this[_m$7];
    const rest = this[_m$8];
    return Root(mergeProps(FEED_TAG, {
      id: ownerID,
      ref: setRef
    }, rest));
  },
  enumerable: true,
  configurable: true
};
function _P$$1(_p, _p2, _p3, _p4, _p5, _p6, _p7, _p8) {
  this[_m$$1] = _p;
  this[_m$2$1] = _p2;
  this[_m$3] = _p3;
  this[_m$4] = _p4;
  this[_m$5] = _p5;
  this[_m$6] = _p6;
  this[_m$7] = _p7;
  this[_m$8] = _p8;
  Object.defineProperty(this, "value", _d$$1);
  Object.defineProperty(this, "children", _d$2$1);
}
_P$$1.prototype = Object.prototype;
var _d$3$1 = {
  get() {
    const label = this[_m$$1];
    const labelID = this[_m$2$1];
    return label.isPresent() ? labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$4$1 = {
  get() {
    const description = this[_m$3];
    const descriptionID = this[_m$4];
    return description.isPresent() ? descriptionID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$5$1 = {
  get() {
    return this[_m$5].index + 1;
  },
  enumerable: true,
  configurable: true
};
var _d$6$1 = {
  get() {
    return this[_m$6].getSize();
  },
  enumerable: true,
  configurable: true
};
function _P$2$1(_p9, _p0, _p1, _p10, _p11, _p12, _p13, _p14, _p15) {
  this[_m$$1] = _p9;
  this[_m$2$1] = _p0;
  this[_m$3] = _p1;
  this[_m$4] = _p10;
  this[_m$5] = _p11;
  this[_m$6] = _p12;
  this.role = _p13;
  this.id = _p14;
  Object.defineProperty(this, "aria-labelledby", _d$3$1);
  Object.defineProperty(this, "aria-describedby", _d$4$1);
  this.tabindex = _p15;
  Object.defineProperty(this, "aria-posinset", _d$5$1);
  Object.defineProperty(this, "aria-setsize", _d$6$1);
}
_P$2$1.prototype = Object.prototype;
var _d$7$1 = {
  get() {
    const ownerID = this[_m$$1];
    const labelID = this[_m$2$1];
    const descriptionID = this[_m$3];
    const label = this[_m$4];
    const description = this[_m$5];
    return {
      ownerID,
      labelID,
      descriptionID,
      hasLabel: label.isPresent,
      registerLabel: label.register,
      hasDescription: description.isPresent,
      registerDescription: description.register
    };
  },
  enumerable: true,
  configurable: true
};
var _d$8$1 = {
  get() {
    const Root = this[_m$6];
    const ownerAttribute = this[_m$7];
    const label = this[_m$4];
    const labelID = this[_m$2$1];
    const description = this[_m$5];
    const descriptionID = this[_m$3];
    const props = this[_m$8];
    const rootContext = this[_m$9];
    const ownerID = this[_m$$1];
    const rest = this[_m$10];
    return Root(mergeProps(FEED_ARTICLE_TAG, ownerAttribute, new _P$2$1(label, labelID, description, descriptionID, props, rootContext, "article", ownerID, 0), rest));
  },
  enumerable: true,
  configurable: true
};
function _P$3$1(_p16, _p17, _p18, _p19, _p20, _p21, _p22, _p23, _p24, _p25) {
  this[_m$$1] = _p16;
  this[_m$2$1] = _p17;
  this[_m$3] = _p18;
  this[_m$4] = _p19;
  this[_m$5] = _p20;
  this[_m$6] = _p21;
  this[_m$7] = _p22;
  this[_m$8] = _p23;
  this[_m$9] = _p24;
  this[_m$10] = _p25;
  Object.defineProperty(this, "value", _d$7$1);
  Object.defineProperty(this, "children", _d$8$1);
}
_P$3$1.prototype = Object.prototype;
var _d$9$1 = {
  get() {
    return this[_m$$1].descriptionID;
  },
  enumerable: true,
  configurable: true
};
function _P$4$1(_p26) {
  this[_m$$1] = _p26;
  Object.defineProperty(this, "id", _d$9$1);
}
_P$4$1.prototype = Object.prototype;
var _d$10 = {
  get() {
    return this[_m$$1].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$5$1(_p27) {
  this[_m$$1] = _p27;
  Object.defineProperty(this, "id", _d$10);
}
_P$5$1.prototype = Object.prototype;
var _d$11 = {
  get() {
    return this[_m$$1].contentID;
  },
  enumerable: true,
  configurable: true
};
var _d$12 = {
  get() {
    const context = this[_m$$1];
    return memo(() => {
      return !!context.hasLabel();
    })() ? context.labelID : void 0;
  },
  enumerable: true,
  configurable: true
};
var _d$13 = {
  get() {
    return this[_m$$1].isBusy() ? "true" : "false";
  },
  enumerable: true,
  configurable: true
};
function _P$6$1(_p28, _p29, _p30) {
  this[_m$$1] = _p28;
  Object.defineProperty(this, "id", _d$11);
  this.role = _p29;
  Object.defineProperty(this, "aria-labelledby", _d$12);
  Object.defineProperty(this, "aria-busy", _d$13);
  this.ref = _p30;
}
_P$6$1.prototype = Object.prototype;
var _d$14 = {
  get() {
    const Root = this[_m$$1];
    const context = this[_m$2$1];
    const setInternalRef = this[_m$3];
    const rest = this[_m$4];
    return Root(mergeProps(FEED_CONTENT_TAG, new _P$6$1(context, "feed", setInternalRef), rest));
  },
  enumerable: true,
  configurable: true
};
function _P$7(_p31, _p32, _p33, _p34, _p35) {
  this[_m$$1] = _p31;
  this[_m$2$1] = _p32;
  this[_m$3] = _p33;
  this[_m$4] = _p34;
  this.value = _p35;
  Object.defineProperty(this, "children", _d$14);
}
_P$7.prototype = Object.prototype;
var _d$15 = {
  get() {
    return this[_m$$1].labelID;
  },
  enumerable: true,
  configurable: true
};
function _P$8(_p36) {
  this[_m$$1] = _p36;
  Object.defineProperty(this, "id", _d$15);
}
_P$8.prototype = Object.prototype;
var FeedContext = createContext(null);
function useFeedContext(componentName) {
  const context = useContext(FeedContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <Feed>`));
  return context;
}
var FEED_TAG = createTag("feed");
var FEED_ARTICLE_TAG = createTag("feed-article");
var FEED_ARTICLE_DESCRIPTION_TAG = createTag("feed-article-description");
var FEED_ARTICLE_LABEL_TAG = createTag("feed-article-label");
var FEED_CONTENT_TAG = createTag("feed-content");
var FEED_LABEL_TAG = createTag("feed-label");
function Feed(props) {
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const contentID = createUniqueId();
  const [, setRef] = createForwardRef(props);
  const label = createPresence();
  const rest = omit(props, "as", "busy", "size", "ref");
  return FeedContext(new _P$$1(ownerID, labelID, contentID, props, label, dynamic(() => props.as || "div"), setRef, rest));
}
var FeedArticleContext = createContext(null);
function useFeedArticleContext(componentName) {
  const context = useContext(FeedArticleContext);
  assert(context, /* @__PURE__ */ new Error(`<${componentName}> must be used inside a <FeedArticle>`));
  return context;
}
function FeedArticle(props) {
  const rootContext = useFeedContext("FeedArticle");
  const ownerID = createUniqueId();
  const labelID = createUniqueId();
  const descriptionID = createUniqueId();
  const label = createPresence();
  const description = createPresence();
  const ownerAttribute = createOwnerAttribute(rootContext.ownerID);
  const rest = omit(props, "as", "index");
  return FeedArticleContext(new _P$3$1(ownerID, labelID, descriptionID, label, description, dynamic(() => props.as || "article"), ownerAttribute, props, rootContext, rest));
}
function FeedArticleDescription(props) {
  const context = useFeedArticleContext("FeedArticleDescription");
  context.registerDescription();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "p")(mergeProps(FEED_ARTICLE_DESCRIPTION_TAG, new _P$4$1(context), rest));
}
function FeedArticleLabel(props) {
  const context = useFeedArticleContext("FeedArticleLabel");
  context.registerLabel();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "span")(mergeProps(FEED_ARTICLE_LABEL_TAG, new _P$5$1(context), rest));
}
var FeedContentContext = createContext(null);
function createFeedArticleFocusNavigator(owner) {
  return new FocusNavigator(owner);
}
var Direction = /* @__PURE__ */ (function(Direction2) {
  Direction2[Direction2["Before"] = 0] = "Before";
  Direction2[Direction2["After"] = 1] = "After";
  return Direction2;
})(Direction || {});
function focusOutside(feed, direction) {
  var _a;
  const nodes = getFocusableElements(document.documentElement, feed);
  const position = direction === Direction.Before ? Node.DOCUMENT_POSITION_PRECEDING : Node.DOCUMENT_POSITION_FOLLOWING;
  const candidates = nodes.filter((node) => feed.compareDocumentPosition(node) & position);
  (_a = direction === Direction.Before ? candidates.at(-1) : candidates.at(0)) == null ? void 0 : _a.focus();
}
function FeedContent(props) {
  const context = useFeedContext("FeedContent");
  const controller = createFeedArticleFocusNavigator(context.ownerID);
  const [internalRef, setInternalRef] = createForwardRef(props);
  createEffect(internalRef, (current) => {
    if (current instanceof HTMLElement) {
      controller.setRef(current);
      return mergeFunc(() => {
        controller.clearRef();
      }, useEventListener(current, "keydown", (e) => {
        if (e.ctrlKey) switch (e.key) {
          case "Home":
            e.preventDefault();
            focusOutside(current, Direction.Before);
            break;
          case "End":
            e.preventDefault();
            focusOutside(current, Direction.After);
        }
        switch (e.key) {
          case "PageUp":
            e.preventDefault();
            controller.setPrevChecked(false);
            break;
          case "PageDown":
            e.preventDefault();
            controller.setNextChecked(false);
        }
      }), useEventListener(current, "focusin", (e) => {
        if (e.target && e.target !== current) controller.setCurrent(e.target);
      }));
    }
  });
  const rest = omit(props, "as", "ref");
  return FeedContentContext(new _P$7(dynamic(() => props.as || "div"), context, setInternalRef, rest, controller));
}
function FeedLabel(props) {
  const context = useFeedContext("FeedLabel");
  context.registerLabel();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "span")(mergeProps(FEED_LABEL_TAG, new _P$8(context), rest));
}
var _tmpl$ = [
  "<div",
  ' class="stack"><!--$-->',
  '<!--/--><button type="button" class="button"',
  ">",
  '</button><p class="hint">Focus an article, then use <kbd>Page Down</kbd> and <kbd>Page Up</kbd> to move between them, or <kbd>Control</kbd> + <kbd>End</kbd> to leave the feed.</p></div>'
];
var _m$ = /* @__PURE__ */ Symbol();
var _m$2 = /* @__PURE__ */ Symbol();
var _d$ = {
  get() {
    return this[_m$].title;
  },
  enumerable: true,
  configurable: true
};
function _P$(_p, _p2) {
  this[_m$] = _p;
  this.class = _p2;
  Object.defineProperty(this, "children", _d$);
}
_P$.prototype = Object.prototype;
var _d$2 = {
  get() {
    return this[_m$].body;
  },
  enumerable: true,
  configurable: true
};
function _P$2(_p3, _p4) {
  this[_m$] = _p3;
  this.class = _p4;
  Object.defineProperty(this, "children", _d$2);
}
_P$2.prototype = Object.prototype;
var _d$3 = {
  get() {
    const index = this[_m$];
    return index();
  },
  enumerable: true,
  configurable: true
};
var _d$4 = {
  get() {
    const post = this[_m$2];
    return [FeedArticleLabel(new _P$(post, "feed-article-title")), FeedArticleDescription(new _P$2(post, "feed-article-body"))];
  },
  enumerable: true,
  configurable: true
};
function _P$3(_p5, _p6, _p7) {
  this[_m$] = _p5;
  this[_m$2] = _p6;
  this.class = _p7;
  Object.defineProperty(this, "index", _d$3);
  Object.defineProperty(this, "children", _d$4);
}
_P$3.prototype = Object.prototype;
var _d$5 = {
  get() {
    const posts = this[_m$];
    return posts();
  },
  enumerable: true,
  configurable: true
};
function _P$4(_p8, _p9) {
  this[_m$] = _p8;
  Object.defineProperty(this, "each", _d$5);
  this.children = _p9;
}
_P$4.prototype = Object.prototype;
var _d$6 = {
  get() {
    const posts = this[_m$];
    return For(new _P$4(posts, (post, index) => FeedArticle(new _P$3(index, post, "feed-article"))));
  },
  enumerable: true,
  configurable: true
};
function _P$5(_p0, _p1) {
  this[_m$] = _p0;
  this.class = _p1;
  Object.defineProperty(this, "children", _d$6);
}
_P$5.prototype = Object.prototype;
var _d$7 = {
  get() {
    const posts = this[_m$];
    return posts().length;
  },
  enumerable: true,
  configurable: true
};
var _d$8 = {
  get() {
    const loading = this[_m$2];
    return loading();
  },
  enumerable: true,
  configurable: true
};
var _d$9 = {
  get() {
    const posts = this[_m$];
    return [FeedLabel({
      class: "feed-label",
      children: "Latest posts"
    }), FeedContent(new _P$5(posts, "feed-content"))];
  },
  enumerable: true,
  configurable: true
};
function _P$6(_p10, _p11, _p12) {
  this[_m$] = _p10;
  this[_m$2] = _p11;
  this.class = _p12;
  Object.defineProperty(this, "size", _d$7);
  Object.defineProperty(this, "busy", _d$8);
  Object.defineProperty(this, "children", _d$9);
}
_P$6.prototype = Object.prototype;
var INITIAL = [
  {
    id: "1",
    title: "Release 2.0.0-next.8",
    body: "Per-component entry points land."
  },
  {
    id: "2",
    title: "Docs site",
    body: "Every example now runs in its own document."
  },
  {
    id: "3",
    title: "Theme contract",
    body: "One stylesheet restyles the whole site."
  }
];
function FeedTimeline() {
  const [posts, setPosts] = createSignal(INITIAL);
  const [loading, setLoading] = createSignal(false);
  var _v$ = ssrHydrationKey(), _v$2 = escape(Feed(new _P$6(posts, loading, "feed"))), _v$3 = () => {
    return ssrAttribute("disabled", escape(loading(), true));
  }, _v$4 = () => {
    return loading() ? "Loading\u2026" : "Load more";
  };
  return ssr(_tmpl$, _v$, _v$2, _v$3, _v$4);
}
var $$moduleUrl = "src/demos/feed/timeline.tsx";

export { $$moduleUrl, FeedTimeline as default };
//# sourceMappingURL=timeline-CYrwzMuB.mjs.map
