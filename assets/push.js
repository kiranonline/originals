
        //service worker
        const publicVapidKey = 'BNSNBlyOuhqiVdXpNeykqQeuW1teX5UMtvKKmpFf3Xp5XmCKwX4o23Se9u5I2DGZImTmkxuMm-G2BLNZYdvmgoo';
        
        if('serviceWorker' in navigator){
            send().catch(err=>console.error(err));
        }

        //register service worker
        async function send(){
            const register = await navigator.serviceWorker.register('/worker.js',{
                scope:'/'
            });
           




            //Registering push
            const subscription =await register.pushManager.subscribe({
                userVisibleOnly : true,
                applicationServerKey : urlBase64ToUint8Array(publicVapidKey) 
            });  


            //sending push notification
            await fetch('/notification',{
                method:'POST',
                body:JSON.stringify(subscription),
                headers:{
                    'content-type':'application/json'
                }
            });



        }



        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
              .replace(/\-/g, '+')
              .replace(/_/g, '/');
          
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
          
            for (let i = 0; i < rawData.length; ++i) {
              outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
          }
          
          




