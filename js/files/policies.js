// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"policies",name:"PricingPolicies.cs",
 what:{en:"Holds the two price rules, Standard and Express. They are ordinary functions that take an order and return a price.",ru:"Содержит два правила цены: Standard и Express. Это обычные функции, которые берут заказ и возвращают цену.",kk:"Екі баға ережесін қамтиды: Standard және Express. Бұл тапсырысты алып, бағаны қайтаратын қарапайым функциялар."},
 code:`using System.Diagnostics.CodeAnalysis;
namespace DeliveryQuotes.Core;

public static class PricingPolicies
{
    public const decimal FreeWeightKg = 5m;
    public const decimal SurchargePerExtraKg = 50m;

    public static decimal Standard(DeliveryRequest request) => Price(request, baseFee: 600m, perKm: 120m);
    public static decimal Express(DeliveryRequest request) => Price(request, baseFee: 1000m, perKm: 180m);

    public static bool TryGetByName(string? name, [NotNullWhen(true)] out Func<DeliveryRequest, decimal>? policy)
    {
        switch (name?.Trim().ToLowerInvariant())
        {
            case "standard": policy = Standard; return true;
            case "express": policy = Express; return true;
            default: policy = null; return false;
        }
    }

    private static decimal Price(DeliveryRequest request, decimal baseFee, decimal perKm)
    {
        var extraKg = Math.Max(0m, request.WeightKg - FreeWeightKg);
        var raw = baseFee + perKm * request.DistanceKm + extraKg * SurchargePerExtraKg;
        return Math.Round(raw, 0, MidpointRounding.AwayFromZero);
    }
}`,
 n:[
 {a:"public static decimal Standard",n:2,en:"Two policies, one shared formula: a fixed fee plus a price per kilometre. Standard is 600 + 120 per km, Express is 1000 + 180 per km. Example: 2 km, Standard gives 600 + 240 = 840; Express gives 1000 + 360 = 1360.",ru:"Две политики, одна общая формула: фиксированная плата плюс цена за километр. Standard — 600 + 120 за км, Express — 1000 + 180 за км. Пример: 2 км, Standard даёт 600 + 240 = 840; Express даёт 1000 + 360 = 1360.",kk:"Екі саясат, бір ортақ формула: тіркелген төлем және әр шақырымға баға. Standard — 600 + км үшін 120, Express — 1000 + км үшін 180. Мысал: 2 км, Standard 600 + 240 = 840 береді; Express 1000 + 360 = 1360 береді."},
 {a:"private static decimal Price",n:5,en:"The shared formula. The first 5 kg are free; every extra kilogram costs 50. Then the price is rounded to whole tenge. The key point: these functions use only their input, so the same order always gives the same price.",ru:"Общая формула. Первые 5 кг бесплатны, каждый лишний килограмм стоит 50. Затем цена округляется до целых тенге. Главное: эти функции используют только свои входные данные, поэтому один и тот же заказ всегда даёт одну и ту же цену.",kk:"Ортақ формула. Алғашқы 5 кг тегін, әр артық килограмм 50 тұрады. Содан кейін баға бүтін теңгеге дейін дөңгелектенеді. Негізгісі: бұл функциялар тек өз кірісін қолданады, сондықтан бір тапсырыс әрқашан бірдей баға береді."},
 {a:"public static bool TryGetByName",n:1,en:"Lets Program.cs pick a policy by its name (\"standard\" or \"express\"). The choice happens outside the pipeline, which is exactly what the assignment asks for.",ru:"Позволяет Program.cs выбрать политику по имени («standard» или «express»). Выбор происходит вне конвейера — ровно как требует задание.",kk:"Program.cs-ке саясатты атымен таңдауға мүмкіндік береді («standard» немесе «express»). Таңдау конвейерден тыс жасалады — тапсырма дәл осыны талап етеді."}]});
