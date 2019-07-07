(function() {
    window.onload = main;

    function main() {
        window.addEventListener('mousemove', e => {
            const obj = {
                x: e.x,
                y: e.y
            };
            window.parent.postMessage(JSON.stringify(obj), '*');
        });
    }
})();
