import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Clock } from "lucide-react";

interface NextPaymentCardProps {
  subscriptionName: string;
  amount: number;
  currency: string;
  date: string;
  daysUntil: number;
  priority: 'high' | 'medium' | 'low';
}

export function NextPaymentCard({
  subscriptionName,
  amount,
  currency,
  date,
  daysUntil,
  priority
}: NextPaymentCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getPriorityBadge = (priority: string, daysUntil: number) => {
    if (daysUntil <= 3) {
      return <Badge variant="destructive" className="text-xs">Urgente</Badge>;
    } else if (daysUntil <= 7) {
      return <Badge variant="outline" className="text-xs border-warning text-warning">Esta semana</Badge>;
    } else {
      return <Badge variant="secondary" className="text-xs">Próximo</Badge>;
    }
  };

  const getCardBorderClass = () => {
    if (daysUntil <= 3) {
      return 'border-l-4 border-l-destructive';
    } else if (daysUntil <= 7) {
      return 'border-l-4 border-l-warning';
    } else {
      return 'border-l-4 border-l-primary';
    }
  };

  return (
    <Card className={`bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up ${getCardBorderClass()}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-foreground">{subscriptionName}</h4>
          {getPriorityBadge(priority, daysUntil)}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-bold text-lg text-foreground">
              {formatPrice(amount, currency)}
            </span>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(date)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>
                {daysUntil === 0 ? 'Hoje' : 
                 daysUntil === 1 ? 'Amanhã' : 
                 `${daysUntil} dias`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}