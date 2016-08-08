// ==UserScript==
// @name        reconciled-text-color
// @namespace   com.gmail.joking777
// @description Reconciled text color
// @include     https://app.youneedabudget.com/*
// @version     1
// @grant       none
// ==/UserScript==
(function poll() {
  // Waits until an external function gives us the all clear that we can run (at /shared/main.js)
  if (typeof ynabToolKit !== 'undefined' && ynabToolKit.pageReady === true) {
    ynabToolKit.reconciledTextColor = (function () {
      // Supporting functions,
      // or variables, etc

      return {
        
        rowChecked() {
            return new MutationObserver(function (mutations) {
                console.log('rowCheckedObserver');
                //mutations.forEach(function (mutation) {
                //    var newVal = $(mutation.target).prop(mutation.attributeName);
                //    if (mutation.attributeName === "class") {
                //        console.log("MutationObserver class changed to", newVal);
                //    }
                //}
            });
        },
        
        //rowReconciled() {
        //    return new MutationObserver(function (mutations) {
        //        console.log('rowReconciledObserver');
        //    });
        //},
                
        invoke() {
          
          var reconciledRows = $('.ynab-grid-body').find('i.is-reconciled');
          reconciledRows.closest('.ynab-grid-body-row').addClass('is-reconciled-row');
          return;
        },

        observe(changedNodes) {
          console.log('observe');
          
          if (changedNodes.has('ynab-grid-body')) {
            // We found Account transactions rows
            ynabToolKit.reconciledTextColor.invoke();
          }
        }
      };
    }()); // Keep feature functions contained within this object

    console.log('reconciledTextColor');
    ynabToolKit.reconciledTextColor.invoke(); // run once on page load
    
    //var observerConfig = {
    //    attributes: true,
    //    subtree: true
    //};
    
    ynabToolKit.reconciledTextColor.rowChecked.observe($('#ember1010'), observerConfig);
    //ynabToolKit.reconciledTextColor.rowReconciled.observer($('.ynab-grid-cell-cleared>i'), observerConfig);
    
  } else {
    setTimeout(poll, 250);
  }
}());
