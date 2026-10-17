// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"stage3",name:"PipelineStages.Stage3Summary.cs",
 what:{en:"Stage 3: turn the priced orders into the final result: sorted quotes, the total, and the number of skipped orders.",ru:"Этап 3: превратить заказы с ценами в итоговый результат: отсортированные котировки, сумму и число пропущенных заказов.",kk:"3-кезең: бағасы бар тапсырыстарды қорытынды нәтижеге айналдыру: сұрыпталған баға ұсыныстары, жалпы сома және қалдырылған тапсырыс саны."},
 code:`using System.Collections.Immutable;
namespace DeliveryQuotes.Core;

public static partial class PipelineStages
{
    public static QuoteSummary BuildSummary(ImmutableArray<PricedRequest> priced, int skippedCount)
    {
        RequireInitialized(priced, nameof(priced));
        ArgumentOutOfRangeException.ThrowIfNegative(skippedCount);

        var quotes = priced
            .OrderByDescending(p => p.Price)
            .ThenBy(p => p.Request.Id, StringComparer.Ordinal)
            .Select(p => new Quote(p.Request.Id, p.Request.Customer, p.Price))
            .ToImmutableArray();

        return new QuoteSummary(quotes, quotes.Sum(q => q.Price), skippedCount);
    }
}`,
 n:[
 {a:"var quotes = priced",n:5,en:"Sort from the most expensive to the cheapest. If two prices are equal, the smaller Id comes first, so the order is always predictable. Then each priced order becomes a simple Quote (id, customer, price).",ru:"Сортируем от самого дорогого к самому дешёвому. Если цены равны, первым идёт меньший Id, поэтому порядок всегда предсказуем. Затем каждый заказ с ценой становится простой котировкой Quote (id, клиент, цена).",kk:"Ең қымбаттан ең арзанға қарай сұрыптаймыз. Бағалар тең болса, кіші Id бірінші тұрады, сондықтан реттілік әрқашан болжамды. Содан кейін бағасы бар әр тапсырыс қарапайым Quote-қа (id, клиент, баға) айналады."},
 {a:"return new QuoteSummary",n:1,en:"We add all prices to get the total and pack everything into the final QuoteSummary. For an empty list the total is simply 0, and nothing crashes.",ru:"Складываем все цены, получаем итог и упаковываем всё в итоговый QuoteSummary. Для пустого списка итог просто 0, и ничего не падает.",kk:"Барлық бағаны қосып, жалпы соманы аламыз да, бәрін қорытынды QuoteSummary-ге салаймыз. Бос тізім үшін жалпы сома жай 0, ештеңе құламайды."}]});
