/**
 * Created by Tarek AlQaddy on 2/5/2017.
 */
(function () {
    var hamb = document.getElementById('hamb');
    var nav = document.querySelector('.main-nav');
    hamb.addEventListener('click',function () {
        hamb.classList.toggle('hamb-open');
        nav.classList.toggle('main-nav-open');
    })
})();
