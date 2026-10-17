// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"stage1",name:"PipelineStages.Stage1Select.cs",
 what:{en:"Stage 1: tidy up the orders and keep only those the courier can deliver.",ru:"Этап 1: привести заказы в порядок и оставить только те, которые курьер может доставить.",kk:"1-кезең: тапсырыстарды ретке келтіріп, тек курьер жеткізе алатындарын қалдыру."},
 code:`using System.Collections.Immutable;
namespace DeliveryQuotes.Core;

public static partial class PipelineStages
{
    public static ImmutableArray<DeliveryRequest> SelectEligible(ImmutableArray<DeliveryRequest> requests, EligibilityRules rules)
    {
        RequireInitialized(requests, nameof(requests));
        ArgumentNullException.ThrowIfNull(rules);
        return requests
            .Select(Normalise)
            .Where(r => r.DistanceKm <= rules.MaxDistanceKm && r.WeightKg <= rules.MaxWeightKg)
            .ToImmutableArray();
    }

    private static DeliveryRequest Normalise(DeliveryRequest request) =>
        request with { Id = request.Id.Trim().ToUpperInvariant(), Customer = request.Customer.Trim() };
}`,
 n:[
 {a:"return requests",n:4,en:"Think of an assembly line. Select(Normalise) cleans every order. Where(...) keeps only orders within the limits; the limits are inclusive, so exactly 30 km is accepted and 31 km is not. ToImmutableArray() packs the result into a new unchangeable list.",ru:"Представьте конвейер на заводе. Select(Normalise) приводит в порядок каждый заказ. Where(...) оставляет только заказы в пределах ограничений; границы включительно, значит ровно 30 км принимается, а 31 км — нет. ToImmutableArray() упаковывает результат в новый неизменяемый список.",kk:"Зауыттағы конвейерді елестетіңіз. Select(Normalise) әр тапсырысты ретке келтіреді. Where(...) тек шектеу ішіндегі тапсырыстарды қалдырады; шектер қоса есептеледі, яғни дәл 30 км қабылданады, ал 31 км қабылданбайды. ToImmutableArray() нәтижені жаңа өзгермейтін тізімге салады."},
 {a:"private static DeliveryRequest Normalise",n:2,en:"“with” makes a changed COPY of the order (upper-case id, trimmed name) and leaves the original untouched. This is how the stage stays pure: it never modifies what the caller gave it.",ru:"«with» создаёт изменённую КОПИЮ заказа (id в верхнем регистре, имя без лишних пробелов) и не трогает оригинал. Так этап остаётся чистым: он никогда не меняет то, что ему передал вызывающий код.",kk:"«with» тапсырыстың өзгертілген КӨШІРМЕСІН жасайды (id бас әріппен, аты бос орынсыз) және түпнұсқаны қозғамайды. Кезең осылай таза болып қалады: ол шақырушы берген нәрсені ешқашан өзгертпейді."},
 {a:"RequireInitialized(requests",n:2,en:"Safety checks: a missing list (default) or missing rules is rejected with an error instead of producing a fake result.",ru:"Проверки безопасности: отсутствующий список (default) или отсутствующие правила отвергаются с ошибкой, вместо выдачи ложного результата.",kk:"Қауіпсіздік тексерулері: жоқ тізім (default) немесе жоқ ережелер жалған нәтиже берудің орнына қатемен қабылданбайды."}]});
