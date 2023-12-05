App.auto_refresh = App.cable.subscriptions.create("AutoRefreshChannel", {
    received: function(data) {
      if (data.status === 'changed') {
        // Odśwież stronę po wykryciu zmiany
        location.reload();
      }
    }
  });
  