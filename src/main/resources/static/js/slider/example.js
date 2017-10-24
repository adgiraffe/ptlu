var start = 0;
var distance = 0;
var stop = 0;
var maxDistance = (window.swipeable.children[0].offsetWidth * window.swipeable.children.length) + ((window.swipeable.children.length - 1) * 20) - window.swipeable.children[0].offsetWidth;
window.wrapper.addEventListener('touchstart', function(e) {
    start = e.touches[0].clientX;
    window.swipeable.style.transition = '0ms';
})

window.wrapper.addEventListener('touchmove', function(e) {
    distance = stop + start - touchEnd+e.touches[0].clientX
    window.swipeable.style.transform = 'translateX(' + (-distance) +'px)';
})

window.wrapper.addEventListener('touchend', function(e) {
    fluentslide();
    stop = distance
});

var fluentslide = function() {
    index = Math.round(distance / 220);
    if (distance % 220 !== 0) {
        distance = index * 220;
    }

    if (distance < 0) {
        distance = 0;
    }

    if (distance > maxDistance) {
        distance = maxDistance;
    }
    window.swipeable.style.transition = '500ms';
    window.swipeable.style.transform = 'translateX(' + (-distance) +'px)';
}
