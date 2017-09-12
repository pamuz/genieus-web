var gradient = anime({
    targets: '.gradient',
    backgroundColor: [
        { value: '#FF0059'},
        { value: '#ff1461'}
    ],
    easing: 'linear',
    direction: 'alternate',
    duration: 5000,
    delay: 1000,
    loop: true
});