

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'button bd-copy tooltipped tooltipped-w');
    elem.setAttribute('data-content', msg);


setTimeout(()=>{
    elem.setAttribute('class', 'button bd-copy');
    elem.removeAttribute('data-content');
},700)


}

var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
    target: function(trigger) {
        console.log(trigger)
        console.log(trigger.previousElementSibling)
        return trigger.previousElementSibling;
    }
});







var color_base=new ClipboardJS('.color_base');


color_base.on('success',function(e) {
    e.clearSelection();
    var color_actual = e.text;
    document.querySelector("#color_talk").classList.add(color_actual);
    document.querySelector("#color_talk").textContent = color_actual;
    document.querySelector(".copy_correct").classList.add("active");
    setTimeout(function () {
        document.querySelector(".copy_correct").classList.remove("active");
        setTimeout(function () {
          document.querySelector("#color_talk").className = "";
        }, 200);
        }, 700);

})
color_base.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});


clipboardSnippets.on('success', function(e) {
    e.clearSelection();
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    showTooltip(e.trigger, 'Copied!');
});

clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');

    if(/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    }
    else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    }
    else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }

    return actionMsg;
}