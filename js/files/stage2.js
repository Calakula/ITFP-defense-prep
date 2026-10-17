// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"stage2",name:"PipelineStages.Stage2Price.cs",
 what:{en:"Stage 2: calculate a price for each selected order. This is the higher-order function: it receives the price rule as a parameter and calls it.",ru:"Этап 2: посчитать цену для каждого отобранного заказа. Это функция высшего порядка: она получает правило цены параметром и вызывает его.",kk:"2-кезең: таңдалған әр тапсырыстың бағасын есептеу. Бұл жоғары ретті функция: ол баға ережесін параметр ретінде алып, оны шақырады."},
 code:`using System.Collections.Immutable;
namespace DeliveryQuotes.Core;

public static partial class PipelineStages
{
    public static ImmutableArray<PricedRequest> PriceRequests(ImmutableArray<DeliveryRequest> eligible, Func<DeliveryRequest, decimal> policy)
    {
        RequireInitialized(eligible, nameof(eligible));
        ArgumentNullException.ThrowIfNull(policy);

        return eligible
            .Select(r => new PricedRequest(r, CheckedPrice(r, policy(r))))
            .ToImmutableArray();
    }

    private static decimal CheckedPrice(DeliveryRequest request, decimal price) =>
        price >= 0m
            ? price
            : throw new InvalidOperationException($"Pricing policy returned a negative price for {request.Id}.");
}`,
 n:[
 {a:"public static ImmutableArray<PricedRequest>",n:1,en:"Look at the last parameter: Func<DeliveryRequest, decimal> policy. It means “a function that takes an order and returns a decimal number”. A function that receives another function is called a higher-order function.",ru:"Посмотрите на последний параметр: Func<DeliveryRequest, decimal> policy. Это значит «функция, которая принимает заказ и возвращает число decimal». Функция, получающая другую функцию, называется функцией высшего порядка.",kk:"Соңғы параметрге қараңыз: Func<DeliveryRequest, decimal> policy. Бұл «тапсырысты алып, decimal санын қайтаратын функция» дегенді білдіреді. Басқа функцияны қабылдайтын функция жоғары ретті функция деп аталады."},
 {a:"return eligible",n:3,en:"policy(r) is the moment the delegate is CALLED, once for every order. Whether it runs Standard or Express, this code does not change. Say this sentence at the defense: “the delegate invocation is policy(r) in PriceRequests”.",ru:"policy(r) — это момент, когда делегат ВЫЗЫВАЕТСЯ, по разу для каждого заказа. Будь то Standard или Express, этот код не меняется. Скажите на защите: «вызов делегата — это policy(r) в PriceRequests».",kk:"policy(r) — делегат ШАҚЫРЫЛАТЫН сәт, әр тапсырыс үшін бір рет. Standard немесе Express болсын, бұл код өзгермейді. Қорғауда айтыңыз: «делегатты шақыру — PriceRequests ішіндегі policy(r)»."},
 {a:"private static decimal CheckedPrice",n:4,en:"A guard: if a policy ever returns a negative price, we stop with an error instead of printing nonsense.",ru:"Защита: если политика вдруг вернёт отрицательную цену, мы останавливаемся с ошибкой вместо вывода бессмыслицы.",kk:"Қорғаныс: егер саясат теріс баға қайтарса, мағынасыз нәрсе шығарудың орнына қатемен тоқтаймыз."}]});
