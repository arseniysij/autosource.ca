var Webflow = Webflow || [];
Webflow.push(function () {
   fetch('https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.2.0/js.cookie.min.js')
      .then(response => response.text())
      .then(text => eval(text))
      .then(() => {

         let checkboxes = [];

         if (Cookies.get('carmatch_completed') == 'true' && Cookies.get('carmatch_used') != 'true' ) {
            $('.filters-wrapper a.active-check:not(.w-condition-invisible)').each(function () {
               checkboxes.push($(this).attr('filter-by'));
            });
            checkboxes.forEach((cookieName) => {
               Cookies.set(cookieName, 'true', { expires: 90 });
            });
            
            Cookies.set('carmatch_used', 'true', { expires: 90 });
         } else {
            $('.filters-wrapper a[filter-by]:not(.w-condition-invisible)').each(function () {
               checkboxes.push($(this).attr('filter-by'));
            })
            checkboxes.forEach((element) => {
               checkCheckboxCookie(element);
            })
         }

         document.querySelector('.filters-wrapper').addEventListener('click', function (e) {
            if (e.target.classList.contains('active-check')) {
               let target = e.target;
               let cookieName = target.getAttribute('filter-by');
               Cookies.set(cookieName, 'true', { expires: 1 });
            } else {
               let cookieName = e.target.getAttribute('filter-by');
               Cookies.remove(cookieName);
            }
            if (e.target.classList.contains('reset-button')) {
               checkboxes.forEach((element) => {
                  Cookies.remove(element);
               })
               selects.forEach((element) => {
                  Cookies.remove(element);
               })
            }
         });

         let selects = ['MIN-4', 'Max-4', 'MIN-5', 'MAX-2'];
         selects.forEach((element) => {
            checkSelectCookie(element);
         })
         function checkSelectCookie(cookieName) {
            if (Cookies.get(cookieName)) {
               let cookieValue = Cookies.get(cookieName);
               $(`.filters-wrapper select#${cookieName}`).val(cookieValue);
               document.querySelector(`.filters-wrapper select#${cookieName}`).dispatchEvent(new Event("change"));;
            }
         }

         $('.filters-wrapper select').change(function () {
            let cookieName = $(this).attr('id');
            let cookieValue = $(this).val();
            console.log(cookieName + " id=" + cookieValue);
            Cookies.set(cookieName, cookieValue, { expires: 1 });
         })

         function checkCheckboxCookie(cookieName) {
            if (Cookies.get(cookieName)) {
               let cookieValue = Cookies.get(cookieName);
               document.querySelector(`.filters-wrapper a[filter-by="${cookieName}"]:not(.w-condition-invisible)`).click();
            }
         }


      })
});