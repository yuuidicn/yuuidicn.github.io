(function(){
  function hashColor(name){
    var h = 0;
    for (var i=0;i<name.length;i++) h = name.charCodeAt(i) + ((h<<5)-h);
    var hue = Math.abs(h) % 360;
    return 'hsl(' + hue + ',62%,52%)';
  }

  function contrastTextColorFromHsl(hsl){
    var m = hsl.match(/hsl\(\s*\d+\s*,\s*\d+%\s*,\s*(\d+)%/);
    if(m){
      var l = parseInt(m[1],10);
      return l > 55 ? '#111' : '#fff';
    }
    return '#fff';
  }

  function applyColors(root){
    var selector = '.post-tags a, .hexo-tags .tag-pill, .tag-pill';
    var els = (root || document).querySelectorAll(selector);
    els.forEach(function(el){
      var name = (el.textContent || el.innerText || '').trim();
      if(!name) return;
      var bg = hashColor(name);
      var fg = contrastTextColorFromHsl(bg);
      el.style.background = bg;
      el.style.color = fg;
      el.setAttribute('data-tag-name', name);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ applyColors(document); });
  } else {
    applyColors(document);
  }

  // expose for dynamic content
  window.WP_Hexo_Sync_ApplyTagPills = applyColors;
})();
