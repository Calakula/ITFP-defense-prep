// Page data for one source file: full code + step-by-step explanations (EN/RU/KK)
(window.F = window.F || []).push({id:"parser",name:"RequestParser.cs",
 what:{en:"The “front door” of the program. It turns raw text lines from the CSV into safe, checked DeliveryRequest values, and explains every problem it finds.",ru:"«Входная дверь» программы. Превращает сырые строки CSV в проверенные значения DeliveryRequest и объясняет каждую найденную проблему.",kk:"Бағдарламаның «кіреберісі». CSV-дің шикі жолдарын тексерілген DeliveryRequest мәндеріне айналдырады және табылған әр мәселені түсіндіреді."},
 code:`using System.Collections.Immutable;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;

namespace DeliveryQuotes.Core;

public static class RequestParser
{
    public const string Header = "Id,Customer,DistanceKm,WeightKg";

    public static ParseReport ParseLines(IEnumerable<string>? lines)
    {
        ArgumentNullException.ThrowIfNull(lines);
        var requests = ImmutableArray.CreateBuilder<DeliveryRequest>();
        var errors = ImmutableArray.CreateBuilder<string>();
        var lineNumber = 0;
        var headerSeen = false;

        foreach (var line in lines)
        {
            lineNumber++;
            if (!headerSeen)
            {
                if (!string.Equals((line ?? string.Empty).Trim(), Header, StringComparison.OrdinalIgnoreCase))
                {
                    errors.Add($"Line {lineNumber}: expected header '{Header}'.");
                    return new ParseReport(requests.ToImmutable(), errors.ToImmutable());
                }
                headerSeen = true;
                continue;
            }
            if (string.IsNullOrWhiteSpace(line)) continue;
            if (TryParseLine(line, out var request, out var error)) requests.Add(request);
            else errors.Add($"Line {lineNumber}: {error}");
        }
        if (!headerSeen) errors.Add("Input is empty: the header line is missing.");
        return new ParseReport(requests.ToImmutable(), errors.ToImmutable());
    }

    public static bool TryParseLine(string? line, [NotNullWhen(true)] out DeliveryRequest? request, out string error)
    {
        request = null; error = string.Empty;
        if (line is null) { error = "line is missing (null)."; return false; }
        var fields = line.Split(',');
        if (fields.Length != 4) { error = $"expected 4 fields but found {fields.Length}."; return false; }
        var id = fields[0].Trim(); var customer = fields[1].Trim();
        if (id.Length == 0) { error = "Id is empty."; return false; }
        if (customer.Length == 0) { error = "Customer is empty."; return false; }
        if (!TryParseNumber(fields[2], out var distance)) { error = $"DistanceKm '{fields[2].Trim()}' is not a number."; return false; }
        if (distance <= 0m) { error = $"DistanceKm must be greater than 0 but was {distance}."; return false; }
        if (!TryParseNumber(fields[3], out var weight)) { error = $"WeightKg '{fields[3].Trim()}' is not a number."; return false; }
        if (weight < 0m) { error = $"WeightKg must not be negative but was {weight}."; return false; }
        request = new DeliveryRequest(id, customer, distance, weight);
        return true;
    }

    private static bool TryParseNumber(string text, out decimal value) =>
        decimal.TryParse(text.Trim(), NumberStyles.AllowLeadingSign | NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out value);
}`,
 n:[
 {a:"ArgumentNullException.ThrowIfNull(lines)",n:5,en:"First we refuse “no input at all” (null) by throwing an error: that is a programming mistake, not an empty file. Then we prepare two lists, one for good orders and one for error messages, and counters for the line number and whether we have seen the header.",ru:"Сначала отвергаем «нет входных данных вообще» (null), выбросив ошибку: это ошибка программиста, а не пустой файл. Затем готовим два списка — для хороших заказов и для сообщений об ошибках — и счётчики: номер строки и «видели ли заголовок».",kk:"Алдымен «кіріс деректер мүлде жоқ» (null) жағдайын қатемен қайтарамыз: бұл бос файл емес, бағдарламашының қатесі. Содан кейін екі тізім дайындаймыз: дұрыс тапсырыстар мен қате хабарламалары үшін, сондай-ақ жол нөмірі мен тақырып көрілгенін білетін есептегіштер."},
 {a:"if (TryParseLine(line",n:2,en:"For every normal line we try to parse it. If it works, the order goes to the good list. If not, we write an error message with the line number. Blank lines are skipped. A file with only the header is valid and simply has zero orders.",ru:"Для каждой обычной строки пробуем разобрать её. Если получилось, заказ идёт в список хороших. Если нет, записываем сообщение об ошибке с номером строки. Пустые строки пропускаем. Файл только с заголовком корректен и просто содержит ноль заказов.",kk:"Әр қарапайым жолды талдап көреміз. Сәтті болса, тапсырыс дұрыс тізімге түседі. Болмаса, жол нөмірімен қате хабарламасын жазамыз. Бос жолдар өткізіліп кетеді. Тек тақырыбы бар файл дұрыс және тек нөл тапсырысы бар."},
 {a:"if (fields.Length != 4)",n:8,en:"TryParseLine checks one field after another and stops at the first problem with a clear message. Distance must be above 0, but weight 0 is allowed (documents weigh almost nothing). Nothing is silently replaced by a default value.",ru:"TryParseLine проверяет поля по очереди и останавливается на первой проблеме с понятным сообщением. Расстояние должно быть больше 0, а вес 0 допустим (документы почти ничего не весят). Ничего не подменяется значением по умолчанию молча.",kk:"TryParseLine өрістерді бір-бірлеп тексереді және бірінші мәселеде түсінікті хабарламамен тоқтайды. Қашықтық 0-ден үлкен болуы керек, ал салмақ 0 болуы мүмкін (құжаттар дерлік салмақсыз). Ештеңе үнсіз әдепкі мәнмен ауыстырылмайды."}]});
